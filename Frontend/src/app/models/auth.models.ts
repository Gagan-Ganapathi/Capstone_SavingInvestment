export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  role: string;
}

export interface RegistrationRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  role: string;
}

export interface User {
role: any;
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
}

export interface Employee {
  id: string;
  userName: string;
  email: string;
}

export interface Response<T> {
  isSuccess: boolean;
  message: string;
  result: T;
}
