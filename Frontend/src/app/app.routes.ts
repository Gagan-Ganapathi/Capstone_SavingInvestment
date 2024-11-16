// import { Routes } from '@angular/router';
import { IncomeComponent } from './components/income/income.component';
import { BudgetComponent } from './components/budget/budget.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { SavingsComponent } from './components/savings/savings.component';
import { InvestmentComponent } from './components/investment/investment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/income', pathMatch: 'full' },
  { path: 'income', component: IncomeComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'savings', component: SavingsComponent },
  { path: 'investment', component: InvestmentComponent },
  { path: 'profile', component: ProfileComponent }
];