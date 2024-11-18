import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Employee } from '../models/auth.models';
import { Response } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:7724/api/user';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Response<Employee[]>> {
    return this.http.get<Response<Employee[]>>(`${this.apiUrl}/employees`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred while fetching employees.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      if (error.status === 404) {
        errorMessage = 'Employee data not found. Please ensure roles are properly configured.';
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized access. Please log in again.';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }

    return throwError(() => errorMessage);
  }
}