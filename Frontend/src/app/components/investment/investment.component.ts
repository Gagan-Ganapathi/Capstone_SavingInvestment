
// import { Component, OnInit } from '@angular/core';
// import { AccountService } from '../../services/account.service';
// import { Account, Transaction, INVESTMENT_TYPES } from '../../models/account.model';
// import Chart from 'chart.js/auto';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//     selector: 'app-investment',
//     standalone:true,
//     imports:[FormsModule,CommonModule],
//     templateUrl: './investment.component.html',
//     styleUrls: ['./investment.component.css']
// })
// export class InvestmentComponent implements OnInit {
//     userId = 'sai'; // Replace with actual user ID
//     investmentAccounts: Account[] = [];
//     transactions: Transaction[] = [];
//     investmentTypes = INVESTMENT_TYPES;
//     transactionsSummary: any = {};
//     chart: any;

//     newTransaction = {
//         type: 'Stocks',
//         amount: 0
//     };

//     constructor(private accountService: AccountService) { }

//     ngOnInit(): void {
//         this.loadInvestmentAccounts();
//         this.loadTransactions();
//         this.loadTransactionsSummary();
//     }

//     loadInvestmentAccounts(): void {
//         this.accountService.getUserAccountsByType(this.userId, 'investment')
//             .subscribe(accounts => this.investmentAccounts = accounts);
//     }

//     loadTransactions(): void {
//         this.accountService.getTransactions(this.userId, 'investment')
//             .subscribe(transactions => {
//                 this.transactions = transactions;
//                 this.updateChart();
//             });
//     }

//     loadTransactionsSummary(): void {
//         this.accountService.getTransactionsSummary(this.userId, 'investment')
//             .subscribe(summary => this.transactionsSummary = summary);
//     }

//     createTransaction(): void {
//         this.accountService.createTransaction(
//             this.userId,
//             'investment',
//             this.newTransaction.type,
//             this.newTransaction.amount
//         ).subscribe(() => {
//             this.loadInvestmentAccounts();
//             this.loadTransactions();
//             this.loadTransactionsSummary();
//             this.newTransaction = {
//                 type: 'Stocks',
//                 amount: 0
//             };
//             console.error(Error);

//         });
//     }

    // ... rest of the existing component code ...

    import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account, Transaction, INVESTMENT_TYPES } from '../../models/account.model';
import Chart from 'chart.js/auto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-investment',
    standalone:true,
    imports:[FormsModule,CommonModule],
    templateUrl: './investment.component.html',
    styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {
    userId = 'sai'; // Replace with actual user ID
    investmentAccounts: Account[] = [];
    transactions: Transaction[] = [];
    investmentTypes = INVESTMENT_TYPES;
    transactionsSummary: any = {};
    chart: any;

    newTransaction = {
        type: 'Stocks',
        amount: 0
    };

    constructor(
      private accountService: AccountService,
      private toastr: ToastrService
      ) { }

    ngOnInit(): void {
        this.loadInvestmentAccounts();
        this.loadTransactions();
        this.loadTransactionsSummary();
    }

    loadInvestmentAccounts(): void {
        this.accountService.getUserAccountsByType(this.userId, 'investment')
            .subscribe(accounts => this.investmentAccounts = accounts);
    }

    loadTransactions(): void {
        this.accountService.getTransactions(this.userId, 'investment')
            .subscribe(transactions => {
                this.transactions = transactions;
                this.updateChart();
            });
    }

    loadTransactionsSummary(): void {
        this.accountService.getTransactionsSummary(this.userId, 'investment')
            .subscribe(summary => this.transactionsSummary = summary);
    }

    // createTransaction(): void {
    //     this.accountService.createTransaction(
    //         this.userId,
    //         'investment',
    //         this.newTransaction.type,
    //         this.newTransaction.amount
    //     ).subscribe({
    //         next: () => {
    //             this.loadInvestmentAccounts();
    //             this.loadTransactions();
    //             this.loadTransactionsSummary();
    //             this.newTransaction = {
    //                 type: 'Stocks',
    //                 amount: 0
    //             };
    //         },
    //         error: (error) => {
    //             console.error('Error creating transaction:', error);
    //             // Handle error appropriately (show message to user, etc.)
    //         }
    //     });
    // }

    createTransaction(): void {
      this.accountService.createTransaction(
          this.userId,
          'investment',
          this.newTransaction.type,
          this.newTransaction.amount
      ).subscribe({
          next: () => {
              this.loadInvestmentAccounts();
              this.loadTransactions();
              this.loadTransactionsSummary();
              this.newTransaction = {
                  type: 'Stocks',
                  amount: 0
              };
              this.toastr.success('Investment transaction completed successfully!', 'Investment Added');
          },
          error: (error) => {
              console.error('Error creating transaction:', error);
              this.toastr.error('Failed to create investment transaction', 'Error');
          }
      });
  }

    updateChart(): void {
              const investmentData = INVESTMENT_TYPES.map(type => ({
                  type,
                  total: this.transactions
                      .filter(t => t.type === type)
                      .reduce((sum, t) => sum + t.amount, 0)
              }));
      
              const ctx = document.getElementById('investmentChart') as HTMLCanvasElement;
              
              if (this.chart) {
                  this.chart.destroy();
              }
      
              this.chart = new Chart(ctx, {
                  type: 'pie',
                  data: {
                      labels: investmentData.map(d => d.type),
                      datasets: [{
                          data: investmentData.map(d => d.total),
                          backgroundColor: [
                              '#FF6384',
                              '#36A2EB',
                              '#4BC0C0'
                          ]
                      }]
                  },
                  options: {
                      responsive: true,
                      plugins: {
                          legend: {
                              position: 'bottom'
                          },
                          title: {
                              display: true,
                              text: 'Investment Distribution'
                          }
                      }
                  }
              });
          }
        
      
}