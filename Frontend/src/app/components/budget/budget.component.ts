import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseBudgetService } from '../../services/expense-budget.service';
import { Budget } from '../../models/budget.model';
import { CommonModule } from '@angular/common';

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
  userId = 'gagan'; // Replace with actual user ID from auth service

  constructor(
    private fb: FormBuilder,
    private service: ExpenseBudgetService
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
    this.service.getUserBudgets(this.userId).subscribe(
      (budgets) => this.budgets = budgets,
      (error) => console.error('Error loading budgets:', error)
    );
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
        },
        (error) => console.error('Error setting budget:', error)
      );
    }
  }
}