export interface Income {
    incomeId?: number;
    userId: string;
    amount: number;
    date: Date;
    source: string;
    description: string;
    createdat:string;
  }
  
  export interface IncomeDto {
    userId: string;
    amount: number;
    date: Date;
    source: string;
    description: string;
  }
  
  export interface MonthlyIncomeDto {
    userId: string;
    totalMonthlyIncome: number;
    month: Date;
  }
