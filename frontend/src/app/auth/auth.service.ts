import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData, LoginRequest, User } from '../models/dtos';
import { Observable } from 'rxjs';
import { environment as env } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${env.backendUrl}/auth/register`, user)
  }

  login(username: string, password: string): Observable<AuthData> {
    return this.http.post<AuthData>(`${env.backendUrl}/auth/login`, {username, password} as LoginRequest);
  }

}
