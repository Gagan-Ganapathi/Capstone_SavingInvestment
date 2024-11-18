// import { Routes } from '@angular/router';
import { IncomeComponent } from './components/income/income.component';
import { BudgetComponent } from './components/budget/budget.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { SavingsComponent } from './components/savings/savings.component';
import { InvestmentComponent } from './components/investment/investment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home-page', component: HomePageComponent },

  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'income', component: IncomeComponent,    canActivate: [AuthGuard]
},
  { path: 'budget', component: BudgetComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'savings', component: SavingsComponent },
  { path: 'investment', component: InvestmentComponent },
  { path: 'profile', component: ProfileComponent }
];