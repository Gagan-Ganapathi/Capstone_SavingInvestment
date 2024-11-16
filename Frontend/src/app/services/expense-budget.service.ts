import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense, ExpenseSummary } from '../models/expense.model';
import { Budget } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseBudgetService {
  private apiUrl = 'https://localhost:5002/api/ExpenseBudget';

  constructor(private http: HttpClient) {}

  getUserExpenses(userId: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/expenses/${userId}`);
  }

  getUserBudgets(userId: string): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.apiUrl}/budgets/${userId}`);
  }

  getMonthlySummary(userId: string): Observable<ExpenseSummary[]> {
    return this.http.get<ExpenseSummary[]>(`${this.apiUrl}/summary/${userId}`);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/expenses`, expense);
  }

  setBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.apiUrl}/budgets`, budget);
  }
}