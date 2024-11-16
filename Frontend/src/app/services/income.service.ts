import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Income, IncomeDto, MonthlyIncomeDto } from '../models/income.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private apiUrl = 'https://localhost:5001/api/Income';

  constructor(private http: HttpClient) {}

  createIncome(income: IncomeDto): Observable<Income> {
    return this.http.post<Income>(this.apiUrl, income);
  }

  getIncome(id: number): Observable<Income> {
    return this.http.get<Income>(`${this.apiUrl}/${id}`);
  }

  getUserIncomes(userId: string): Observable<Income[]> {
    return this.http.get<Income[]>(`${this.apiUrl}/user/${userId}`);
  }

  updateIncome(id: number, income: IncomeDto): Observable<Income> {
    return this.http.put<Income>(`${this.apiUrl}/${id}`, income);
  }

  deleteIncome(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMonthlyIncome(userId: string): Observable<MonthlyIncomeDto> {
    return this.http.get<MonthlyIncomeDto>(`${this.apiUrl}/monthly/${userId}`);
  }
}
