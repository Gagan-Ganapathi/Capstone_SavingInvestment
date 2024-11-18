import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'https://localhost:7164/api/Account';

  constructor(private http: HttpClient) {}

  getTransactions(accountId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${accountId}/transactions`);
  }

  createTransaction(accountId: number, type: string, amount: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${accountId}/transaction`, { type, amount });
  }
}
