import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseBudgetService } from '../../services/expense-budget.service';
import { Budget } from '../../models/budget.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-budget',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  budgetForm: FormGroup;
  budgets: Budget[] = [];
  categories = ['Food', 'Transportation','Rent', 'Entertainment', 'Utilities', 'Others'];
  periods = ['Monthly', 'Quarterly', 'Yearly'];
  userId = localStorage.getItem('userid');

  constructor(
    private fb: FormBuilder,
    private service: ExpenseBudgetService,
    private toastr: ToastrService

  ) {
    this.budgetForm = this.fb.group({
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isRecurring: [false],
      period: ['Monthly']
    });
  }

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    if(this.userId){
    this.service.getUserBudgets(this.userId).subscribe(
      (budgets) => this.budgets = budgets,
      (error) => console.error('Error loading budgets:', error)
    );}
    else{
      console.error('User ID not found');
    }
  }

  onSubmit(): void {
    if (this.budgetForm.valid) {
      const budget: Budget = {
        ...this.budgetForm.value,
        userId: this.userId
      };
      this.service.setBudget(budget).subscribe(
        () => {
          this.loadBudgets();
          this.budgetForm.reset();
          this.toastr.success('Budget added successfully','Budget Added');

        },
        (error) =>  this.toastr.error('Budget cannot exceed this months income', 'Error')
        //alert('Budget cannot exceed this months income')
      );
    }
   
  }
}