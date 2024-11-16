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


import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account, Transaction, SAVINGS_TYPES } from '../../models/account.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-savings',
    standalone:true,
     imports:[FormsModule,CommonModule],
    templateUrl: './savings.component.html',
    styleUrls: ['./savings.component.css']
})
export class SavingsComponent implements OnInit {
    userId = 'sai'; // Replace with actual user ID
    savingsAccounts: Account[] = [];
    transactions: Transaction[] = [];
    savingsTypes = SAVINGS_TYPES;
    accountsSummary: any = {};
    transactionsSummary: any = {};
    
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
        this.accountService.getUserAccountsByType(this.userId, 'savings')
            .subscribe(accounts => this.savingsAccounts = accounts);
    }

    loadTransactions(): void {
        this.accountService.getTransactions(this.userId, 'savings')
            .subscribe(transactions => this.transactions = transactions);
    }

    loadAccountsSummary(): void {
        this.accountService.getAccountsSummary(this.userId)
            .subscribe(summary => this.accountsSummary = summary);
    }

    loadTransactionsSummary(): void {
        this.accountService.getTransactionsSummary(this.userId, 'savings')
            .subscribe(summary => this.transactionsSummary = summary);
    }

    // createAccount(): void {
    //     // Pass parameters directly instead of as an object
    //     this.accountService.createAccount(this.userId, this.newAccount.accountType)
    //         .subscribe({
    //             next: () => {
    //                 this.loadSavingsAccounts();
    //                 this.loadAccountsSummary();
    //             },
    //             error: (error) => {
    //                 console.error('Error creating account:', error);
    //                 // Handle error appropriately (show message to user, etc.)
    //             }
    //         });
    // }

    // createTransaction(): void {
    //     this.accountService.createTransaction(
    //         this.userId,
    //         'savings',
    //         this.newTransaction.type,
    //         this.newTransaction.amount
    //     ).subscribe({
    //         next: () => {
    //             this.loadSavingsAccounts();
    //             this.loadTransactions();
    //             this.loadAccountsSummary();
    //             this.loadTransactionsSummary();
    //             this.newTransaction = {
    //                 type: 'Cash',
    //                 amount: 0
    //             };
    //         },
    //         error: (error) => {
    //             console.error('Error creating transaction:', error);
    //             // Handle error appropriately (show message to user, etc.)
    //         }
    //     });
    // }
    
    createAccount(): void {
      this.accountService.createAccount(this.userId, this.newAccount.accountType)
          .subscribe({
              next: () => {
                  this.loadSavingsAccounts();
                  this.loadAccountsSummary();
                  this.toastr.success('New savings account created successfully!', 'Account Created');
                  
              },
              error: (error) => {
                  console.error('Error creating account:', error);
                  this.toastr.error('Failed to create savings account', 'Error');
              }
          });
  }

  createTransaction(): void {
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
              this.newTransaction = {
                  type: 'Cash',
                  amount: 0
              };
              this.toastr.success('Savings transaction completed successfully!', 'Transaction Created');
              alert("Transaction created successfully")
          },
          error: (error) => {
              console.error('Error creating transaction:', error);
              this.toastr.error('Failed to create transaction', 'Error');
          }
      });
  }
}