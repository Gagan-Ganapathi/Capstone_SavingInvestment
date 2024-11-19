// import { Component, OnInit } from '@angular/core';
// import { AccountService } from '../../services/account.service';
// import { Account, Transaction, SAVINGS_TYPES } from '../../models/account.model';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//     selector: 'app-savings',
//     standalone:true,
//     imports:[FormsModule,CommonModule],
//     templateUrl: './savings.component.html',
//     styleUrls: ['./savings.component.css']
// })
// export class SavingsComponent implements OnInit {
//     userId = 'sai'; // Replace with actual user ID
//     savingsAccounts: Account[] = [];
//     transactions: Transaction[] = [];
//     savingsTypes = SAVINGS_TYPES;
//     accountsSummary: any = {};
//     transactionsSummary: any = {};
    
//     newAccount = {
//         accountType: 'savings'
//     };
    
//     newTransaction = {
//         type: 'Cash',
//         amount: 0
//     };

//     constructor(private accountService: AccountService) { }

//     ngOnInit(): void {
//         this.loadSavingsAccounts();
//         this.loadTransactions();
//         this.loadAccountsSummary();
//         this.loadTransactionsSummary();
//     }

//     loadSavingsAccounts(): void {
//         this.accountService.getUserAccountsByType(this.userId, 'savings')
//             .subscribe(accounts => this.savingsAccounts = accounts);
//     }

//     loadTransactions(): void {
//         this.accountService.getTransactions(this.userId, 'savings')
//             .subscribe(transactions => this.transactions = transactions);
//     }

//     loadAccountsSummary(): void {
//         this.accountService.getAccountsSummary(this.userId)
//             .subscribe(summary => this.accountsSummary = summary);
//     }

//     loadTransactionsSummary(): void {
//         this.accountService.getTransactionsSummary(this.userId, 'savings')
//             .subscribe(summary => this.transactionsSummary = summary);
//     }

//     createAccount(): void {
//         this.accountService.createAccount(this.userId, this.newAccount.accountType)
//             .subscribe(() => {
//                 this.loadSavingsAccounts();
//                 this.loadAccountsSummary();
//             });
//     }

//     createTransaction(): void {
//         this.accountService.createTransaction(
//             this.userId,
//             'savings',
//             this.newTransaction.type,
//             this.newTransaction.amount
//         ).subscribe(() => {
//             this.loadSavingsAccounts();
//             this.loadTransactions();
//             this.loadAccountsSummary();
//             this.loadTransactionsSummary();
//             this.newTransaction = {
//                 type: 'Cash',
//                 amount: 0
//             };
//         });
//     }
// }


// import { Component, OnInit } from '@angular/core';
// import { AccountService } from '../../services/account.service';
// import { Account, Transaction, SAVINGS_TYPES } from '../../models/account.model';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ToastrService } from 'ngx-toastr';


// @Component({
//     selector: 'app-savings',
//     standalone:true,
//      imports:[FormsModule, CommonModule],
//     templateUrl: './savings.component.html',
//     styleUrls: ['./savings.component.css']
// })
// export class SavingsComponent implements OnInit {
//     userId = localStorage.getItem('userid');
//     savingsAccounts: Account[] = [];
//     transactions: Transaction[] = [];
//     savingsTypes = SAVINGS_TYPES;
//     accountsSummary: any = {};
//     transactionsSummary: any = {};
    
//     newAccount = {
//         accountType: 'savings'
//     };
    
//     newTransaction = {
//         type: 'Cash',
//         amount: 0
//     };

    
//     // Pie Chart Configuration
   

//     constructor(
//       private accountService: AccountService,
//       private toastr: ToastrService
//   ) { }

//     ngOnInit(): void {
//         this.loadSavingsAccounts();
//         this.loadTransactions();
//         this.loadAccountsSummary();
//         this.loadTransactionsSummary();
//     }

//     loadSavingsAccounts(): void {
//         if(this.userId){
//         this.accountService.getUserAccountsByType(this.userId, 'savings')
//             .subscribe(accounts =>{             
//             this.savingsAccounts = accounts;
//           console.log('response: ', this.savingsAccounts)});
//             } 
//             else{
//               this.toastr.error('User ID not found');
//             }
//     }

   
//     loadTransactions(): void {
//         if(this.userId){

//         this.accountService.getTransactions(this.userId, 'savings')
//             .subscribe(transactions =>{            
//             this.transactions = transactions});
//         }
//         else{
//           this.toastr.error('User ID not found');
//         }
//     }

//     loadAccountsSummary(): void {
//         if(this.userId){

//         this.accountService.getAccountsSummary(this.userId)
//             .subscribe(summary => this.accountsSummary = summary);
//         }
//         else{
//           this.toastr.error('User ID not found');
//         }
//     }

//     loadTransactionsSummary(): void {
//         if(this.userId){

//         this.accountService.getTransactionsSummary(this.userId, 'savings')
//             .subscribe(summary => this.transactionsSummary = summary);
//         }
//         else{
//           this.toastr.error('User ID not found');
//         }
//     }

//     // createAccount(): void {
//     //     // Pass parameters directly instead of as an object
//     //     this.accountService.createAccount(this.userId, this.newAccount.accountType)
//     //         .subscribe({
//     //             next: () => {
//     //                 this.loadSavingsAccounts();
//     //                 this.loadAccountsSummary();
//     //             },
//     //             error: (error) => {
//     //                 console.error('Error creating account:', error);
//     //                 // Handle error appropriately (show message to user, etc.)
//     //             }
//     //         });
//     // }

//     // createTransaction(): void {
//     //     this.accountService.createTransaction(
//     //         this.userId,
//     //         'savings',
//     //         this.newTransaction.type,
//     //         this.newTransaction.amount
//     //     ).subscribe({
//     //         next: () => {
//     //             this.loadSavingsAccounts();
//     //             this.loadTransactions();
//     //             this.loadAccountsSummary();
//     //             this.loadTransactionsSummary();
//     //             this.newTransaction = {
//     //                 type: 'Cash',
//     //                 amount: 0
//     //             };
//     //         },
//     //         error: (error) => {
//     //             console.error('Error creating transaction:', error);
//     //             // Handle error appropriately (show message to user, etc.)
//     //         }
//     //     });
//     // }
    
//     createAccount(): void {
//         if(this.userId){

//       this.accountService.createAccount(this.userId, this.newAccount.accountType)
//           .subscribe({
//               next: () => {
//                   this.loadSavingsAccounts();
//                   this.loadAccountsSummary();
//                   this.toastr.success('New savings account created successfully!', 'Account Created');
//                   alert(this.newAccount.accountType + ' created successfully');

//               },
//               error: (error) => {
//                   console.error('Error creating account:',error);
//                   this.toastr.error('Failed to create savings account', 'Error');
//                   alert('Account already exists');
//               }
//           });
//         }
//         else{
//           this.toastr.error('User ID not found');
//         }
//   }

//   createTransaction(): void {
//     if(this.userId){

//       this.accountService.createTransaction(
//           this.userId,
//           'savings',
//           this.newTransaction.type,
//           this.newTransaction.amount
//       ).subscribe({
//           next: () => {
//               this.loadSavingsAccounts();
//               this.loadTransactions();
//               this.loadAccountsSummary();
//               this.loadTransactionsSummary();
             
//               this.toastr.success('Savings transaction completed successfully!', 'Transaction Created');
//               alert(this.newTransaction.type + ' Transaction created successfully');
//               this.newTransaction = {
//                 type: 'Cash',
//                 amount: 0
//             };
//           },
//           error: (error) => {
//               console.error('Error creating transaction:', error);
//               this.toastr.error('Failed to create transaction', 'Error');
//               alert('Failed to create transaction');

//           }
//       });
//   }
//  else {
//     this.toastr.error('User ID not found');
//      }
//   }

// }


import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account, Transaction, SAVINGS_TYPES } from '../../models/account.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Chart from 'chart.js/auto';

@Component({
    selector: 'app-savings',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './savings.component.html',
    styleUrls: ['./savings.component.css']
})
export class SavingsComponent implements OnInit {
    userId = localStorage.getItem('userid');
    savingsAccounts: Account[] = [];
    transactions: Transaction[] = [];
    savingsTypes = SAVINGS_TYPES;
    accountsSummary: any = {};
    transactionsSummary: any = {};
    chart: any;
    
    newAccount = {
        accountType: 'savings'
    };
    
    newTransaction = {
        type: 'Cash',
        amount: 0
    };

    constructor(
        private accountService: AccountService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.loadSavingsAccounts();
        this.loadTransactions();
        this.loadAccountsSummary();
        this.loadTransactionsSummary();
    }

    loadSavingsAccounts(): void {
        if(this.userId) {
            this.accountService.getUserAccountsByType(this.userId, 'savings')
                .subscribe(accounts => {             
                    this.savingsAccounts = accounts;
                    console.log('response: ', this.savingsAccounts);
                });
        } else {
            this.toastr.error('User ID not found');
        }
    }

    loadTransactions(): void {
        if(this.userId) {
            this.accountService.getTransactions(this.userId, 'savings')
                .subscribe(transactions => {            
                    this.transactions = transactions;
                    this.updateChart(); // Update chart when transactions are loaded
                });
        } else {
            this.toastr.error('User ID not found');
        }
    }

    loadAccountsSummary(): void {
        if(this.userId) {
            this.accountService.getAccountsSummary(this.userId)
                .subscribe(summary => this.accountsSummary = summary);
        } else {
            this.toastr.error('User ID not found');
        }
    }

    loadTransactionsSummary(): void {
        if(this.userId) {
            this.accountService.getTransactionsSummary(this.userId, 'savings')
                .subscribe(summary => {
                    this.transactionsSummary = summary;
                    console.log(this.transactionsSummary);
                });
        } else {
            this.toastr.error('User ID not found');
        }
    }

    createAccount(): void {
        if(this.userId) {
            this.accountService.createAccount(this.userId, this.newAccount.accountType)
                .subscribe({
                    next: () => {
                        this.loadSavingsAccounts();
                        this.loadAccountsSummary();
                        this.toastr.success('New savings account created successfully!', 'Account Created');
                        alert(this.newAccount.accountType + ' created successfully');
                    },
                    error: (error) => {
                        console.error('Error creating account:', error);
                        this.toastr.error('Failed to create savings account', 'Error');
                        alert('Account already exists');
                    }
                });
        } else {
            this.toastr.error('User ID not found');
        }
    }

    createTransaction(): void {
        if(this.userId) {
            this.accountService.createTransaction(
                this.userId,
                'savings',
                this.newTransaction.type,
                this.newTransaction.amount
            ).subscribe({
                next: () => {
                    this.loadSavingsAccounts();
                    this.loadTransactions();
                    this.loadAccountsSummary();
                    this.loadTransactionsSummary();
                    
                    this.toastr.success('Savings transaction completed successfully!', 'Transaction Created');
                    alert(this.newTransaction.type + ' Transaction created successfully');
                    this.newTransaction = {
                        type: 'Cash',
                        amount: 0
                    };
                },
                error: (error) => {
                    console.error('Error creating transaction:', error);
                    this.toastr.error('Failed to create transaction', 'Error');
                    alert('Failed to create transaction');
                }
            });
        } else {
            this.toastr.error('User ID not found');
        }
    }

    updateChart(): void {
        const savingsData = SAVINGS_TYPES.map(type => ({
            type,
            total: this.transactions
                .filter(t => t.type === type)
                .reduce((sum, t) => sum + t.amount, 0)
        }));

        const ctx = document.getElementById('savingsChart') as HTMLCanvasElement;
        
        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: savingsData.map(d => d.type),
                datasets: [{
                    data: savingsData.map(d => d.total),
                    backgroundColor: [
                        '#6C63FF', // Primary color from your CSS variables
                        '#FF6584', // Accent color from your CSS variables
                        '#3F3D56', // Secondary color from your CSS variables
                        '#1A1A2E'  // Dark background color from your CSS variables
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#FFFFFF' // Light text color for dark theme
                        }
                    },
                    title: {
                        display: true,
                        text: 'Savings Distribution',
                        color: '#FFFFFF' // Light text color for dark theme
                    }
                }
            }
        });
    }
}