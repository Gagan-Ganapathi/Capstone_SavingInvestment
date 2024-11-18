export interface Account {
    id: number;
    userId: string;
    accountType: string;
    balance: number;
    createdAt: Date;
}

export interface Transaction {
    id: number;
    userId: string;
    accountId: number;
    type: string;
    accountType: string;
    amount: number;
    transactionDate: Date;
}

export interface AccountsSummary {
    totalBalance: number;
    totalSavings: number;
    totalInvestments: number;
    accountCount: number;
}

export interface TransactionSummary {
    totalDeposits: number;
    totalWithdrawals: number;
    totalInvestments: number;
    transactionCount: number;
    totalStocks: number;
    totalMFs: number;
    totalCash: number;
    totalProperty: number;
    totalGold: number;
    totalEFs: number;
    totalCrypto: number;
    accountType: string;
}



export const SAVINGS_TYPES = ['Cash', 'Gold', 'Emergency Fund'] as const;
export const INVESTMENT_TYPES = ['Stocks', 'Mutual funds', 'Property','Crypto'] as const;