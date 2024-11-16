export interface Budget {
    id?: number;
    userId: string;
    category: string;
    amount: number;
    startDate: Date;
    endDate: Date;
    isRecurring: boolean;
    period: string;
  }