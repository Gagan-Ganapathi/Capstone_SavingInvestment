import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeService } from '../../services/income.service';
import { Income, IncomeDto } from '../../models/income.model';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  providers: [IncomeService]
})

export class IncomeComponent implements OnInit {
  incomes: Income[] = [];
  totalMonthlyIncome: number = 0;
  incomeForm: FormGroup;
  isEditing: boolean = false;
  editingIncomeId?: number;
  showForm: boolean = false;

  constructor(
    private incomeService: IncomeService,
    private fb: FormBuilder
  ) {
    this.incomeForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      source: ['', Validators.required],
      description: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    
    this.loadIncomes();
  }

  loadIncomes(): void {
    const userId = localStorage.getItem('userid');
    if (userId) {
      // Proceed only if userId is not null
      this.incomeService.getUserIncomes(userId).subscribe(
        (incomes) => {
          this.incomes = incomes;
          this.loadMonthlyTotal();
        },
        (error) => console.error('Error loading incomes:', error)
      );
    } else {
      console.error('User ID is not available in localStorage.');
      // Handle the case when userId is null (e.g., redirect to login or show an error message)
    }
  }
  

  loadMonthlyTotal(): void {
    const userId = localStorage.getItem('userid');
    if (userId) {   
       this.incomeService.getMonthlyIncome(userId).subscribe(
      (data) => this.totalMonthlyIncome = data.totalMonthlyIncome,
      (error) => console.error('Error loading monthly total:', error)
    ); } 
    else {
      console.error('User ID is not available in localStorage.');
      // Handle the case when userId is null (e.g., redirect to login or show an error message)
    }
  }

  onSubmit(): void {
    if (this.incomeForm.valid) {
      const userid = localStorage.getItem('userid');
    if (userid) {   
      
      const incomeData: IncomeDto = {
        userId: userid, // Replace with actual user ID
        ...this.incomeForm.value
      };

      if (this.isEditing && this.editingIncomeId) {
        this.incomeService.updateIncome(this.editingIncomeId, incomeData).subscribe(
          () => this.handleSubmitSuccess(),
          (error) => console.error('Error updating income:', error)
        );
      } else {
        this.incomeService.createIncome(incomeData).subscribe(
          () => this.handleSubmitSuccess(),
          (error) => console.error('Error creating income:', error)
        );
      }
    } else {
      console.error('User ID is not available in localStorage.');
      // Handle the case when userId is null (e.g., redirect to login or show an error message)
    }
    }
  }

  handleSubmitSuccess(): void {
    this.loadIncomes();
    this.resetForm();
  }

  editIncome(income: Income): void {
    this.isEditing = true;
    this.editingIncomeId = income.incomeId;
    this.showForm = true;
    this.incomeForm.patchValue({
      amount: income.amount,
      date: new Date(income.date).toISOString().split('T')[0],
      source: income.source,
      description: income.description
    });
  }

  deleteIncome(id: number): void {
    if (confirm('Are you sure you want to delete this income?')) {
      this.incomeService.deleteIncome(id).subscribe(
        () => this.loadIncomes(),
        (error) => console.error('Error deleting income:', error)
      );
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingIncomeId = undefined;
    this.showForm = false;
    this.incomeForm.reset();
  }
}
