import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData, LoginRequest, User } from '../models/dtos';
import { Observable } from 'rxjs';
import { environment as env } from "../../environments/environment";
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStore: LocalStorageService) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${env.backendUrl}/auth/register`, user)
  }

  login(username: string, password: string): Observable<AuthData> {
    return this.http.post<AuthData>(`${env.backendUrl}/auth/login`, {username, password} as LoginRequest);
  }

  logout() {
    this.localStore.clearToken();
  }

  isAuthenticated(): boolean {
    const id_token = this.localStore.getToken();
    return id_token != null;
  }

}
