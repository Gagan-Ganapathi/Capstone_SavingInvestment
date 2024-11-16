// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Account, Transaction } from '../models/account.model';

// @Injectable({
//     providedIn: 'root'
// })
// export class AccountService {
//     private baseUrl = 'https://localhost:7164/api/Account';

//     constructor(private http: HttpClient) { }

//     createAccount(userId: string, accountType: string): Observable<Account> {
//         return this.http.post<Account>(`${this.baseUrl}`, { userId, accountType });
//     }

//     getUserAccountsByType(userId: string, accountType: string): Observable<Account[]> {
//         return this.http.get<Account[]>(`${this.baseUrl}/accounts/${userId}/${accountType}`);
//     }

//     createTransaction(userId: string, accountType: string, type: string, amount: number): Observable<Transaction> {
//         return this.http.post<Transaction>(`${this.baseUrl}/transaction`, { userId, accountType, type, amount });
//     }

//     getTransactions(userId: string, accountType: string): Observable<Transaction[]> {
//         return this.http.get<Transaction[]>(`${this.baseUrl}/transactions?userId=${userId}&accountType=${accountType}`);
//     }

//     getAccountsSummary(userId: string): Observable<any> {
//         return this.http.get(`${this.baseUrl}/accounts/${userId}/summary`);
//     }

//     getTransactionsSummary(userId: string, accountType: string): Observable<any> {
//         return this.http.get(`${this.baseUrl}/transactions/summary/${userId}/${accountType}`);
//     }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, Transaction } from '../models/account.model';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private baseUrl = 'https://localhost:7164/api/Account';

    constructor(private http: HttpClient) { }

    createAccount(userId: string, accountType: string): Observable<Account> {
        // Add query parameters instead of request body
        const params = new HttpParams()
            .set('userId', userId)
            .set('accountType', accountType);
            
        return this.http.post<Account>(`${this.baseUrl}`, null, { params });
    }

    getUserAccountsByType(userId: string, accountType: string): Observable<Account[]> {
        return this.http.get<Account[]>(`${this.baseUrl}/accounts/${userId}/${accountType}`);
    }

    createTransaction(userId: string, accountType: string, type: string, amount: number): Observable<Transaction> {
        // Add query parameters instead of request body
        const params = new HttpParams()
            .set('userId', userId)
            .set('accountType', accountType)
            .set('type', type)
            .set('amount', amount.toString());
            
        return this.http.post<Transaction>(`${this.baseUrl}/transaction`, null, { params });
    }

    getTransactions(userId: string, accountType: string): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${this.baseUrl}/transactions?userId=${userId}&accountType=${accountType}`);
    }

    getAccountsSummary(userId: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/accounts/${userId}/summary`);
    }

    getTransactionsSummary(userId: string, accountType: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/transactions/summary/${userId}/${accountType}`);
    }
}