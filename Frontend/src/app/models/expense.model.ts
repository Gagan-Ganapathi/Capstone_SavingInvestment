export interface Expense {
    id?: number;
    userId: string;
    category: string;
    amount: number;
    description: string;
    date: Date;
    paymentMethod: string;
  }
  
  export interface ExpenseSummary {
    category: string;
    totalSpent: number;
    budgetAmount: number;
    remainingBudget: number;
    spendingPercentage: number;
  }
