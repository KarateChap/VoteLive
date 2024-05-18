import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from './types/user.interface';
import { LoginUser } from './types/login-user.interface';
import { RegisterUser } from './types/register-user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}api/account`);
  }

  login(loginUser: LoginUser): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}api/account/login`, loginUser);
  }

  register(registerUser: RegisterUser): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}api/account/register`,
      registerUser
    );
  }
}
