// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Employee } from '../models/auth.models';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = 'http://localhost:7724/api/user/employees';

//   constructor(private http: HttpClient) {}

//   getEmployees(): Observable<Employee[]> {
//     return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
//   }
// }

// src/app/services/user.service.ts
/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/auth.models';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:7724/api/Auth/users'; // Your API endpoint

  constructor(private http: HttpClient) { }


  getEmployees(): Observable<Response<User[]>> {
    return this.http.get<ResponseDto<User[]>>(`${this.baseUrl}/employees`);
  }
}*/
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface ResponseDto<T> {
  isSuccess: boolean;
  message: string;
  result: T;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7724/api/Auth'; // Adjust based on your API URL

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<ResponseDto<User[]>> {
    return this.http.get<ResponseDto<User[]>>(this.baseUrl);
  }

  getAllUsers(): Observable<ResponseDto<User[]>> {
    return this.http.get<ResponseDto<User[]>>(`${this.baseUrl}/users`);
  }

  getUserById(userId: string): Observable<ResponseDto<User>> {
    return this.http.get<ResponseDto<User>>(`${this.baseUrl}/user/${userId}`);
  }

  getUsersByRole(role: string): Observable<ResponseDto<User[]>> {
    return this.http.get<ResponseDto<User[]>>(`${this.baseUrl}/users/role/${role}`);
  }
}
