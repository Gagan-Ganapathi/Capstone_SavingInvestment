import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegistrationRequest, User, Response } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7724/api/Auth';
  private userSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticated = false; // Default is not authenticated
  private isAdmin = false; 

  // Get authentication status
  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }
    
  getAdminStatus(): boolean {
    return this.isAdmin;
  }
  
  
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  login(loginRequest: LoginRequest): Observable<Response<LoginResponse>> {
    return this.http.post<Response<LoginResponse>>(`${this.apiUrl}/login`, loginRequest)
      .pipe(
        tap(response => {
          if (response.isSuccess && response.result) {
            localStorage.setItem('token', response.result.token);
            localStorage.setItem('user', JSON.stringify(response.result.user));
            this.userSubject.next(response.result.user);
            localStorage.setItem('role', response.result.role);
          this.isAdmin = response.result.role === 'admin';
            this.isAuthenticated = true;
            console.log(this.isAuthenticated);
            console.log(this.isAdmin);


          }
        })
      );
  }

  register(registrationRequest: RegistrationRequest): Observable<Response<void>> {
    return this.http.post<Response<void>>(`${this.apiUrl}/register`, registrationRequest);
  }

  assignRole(email: string, role: string): Observable<Response<void>> {
    return this.http.post<Response<void>>(`${this.apiUrl}/assignRole`, { email, role });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userid');
    localStorage.removeItem('role');


    this.userSubject.next(null);
    this.isAuthenticated = false;

  }

  get currentUser$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
}
