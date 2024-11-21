import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseBudgetService } from '../../services/expense-budget.service';
import { Expense, ExpenseSummary } from '../../models/expense.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-expense',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  expenses: Expense[] = [];
  summaries: ExpenseSummary[] = [];
  categories = ['Food', 'Transportation', 'Rent','Entertainment', 'Utilities', 'Others'];
  paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI'];
  userId = localStorage.getItem('userid');
 
  constructor(
    private fb: FormBuilder,
    private service: ExpenseBudgetService,
    private toastr: ToastrService


  ) {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      date: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadSummary();
  }

  loadExpenses(): void {
    if(this.userId){
    this.service.getUserExpenses(this.userId).subscribe(
      (expenses) => this.expenses = expenses,
      (error) => console.error('Error loading expenses:', error)
    );
  }
  else{
    console.log("User id not found");
  }
  }

  loadSummary(): void {
    if(this.userId){
    this.service.getMonthlySummary(this.userId).subscribe(
      (summaries) => this.summaries = summaries,
      (error) => console.error('Error loading summary:', error)
    );
    }
    else{
    console.log("User id not found");
    }
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const expense: Expense = {
        ...this.expenseForm.value,
        userId: this.userId
      };
      this.service.addExpense(expense).subscribe(
        () => {
          this.loadExpenses();
          this.loadSummary();
          this.expenseForm.reset();
          this.toastr.success('Expense added successfully', 'Expense Added')
        },
        (error) => this.toastr.error('Expense cannot be greater than budget', 'Error')
      );
    }
  }
}
