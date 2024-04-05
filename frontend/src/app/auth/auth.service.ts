import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData, LoginRequest, User, UserDTO } from '../models/dtos';
import { Observable } from 'rxjs';
import { environment as env } from "../../environments/environment";
import { LocalStorageService } from '../shared/services/local-storage.service';
import { AuthStore } from './auth.store';

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
    this.localStore.clear();
  }

  isAuthenticated(): boolean {
    const id_token = this.localStore.getToken();
    return id_token != null;
  }

  checkIsAllowed(tripId: string, userId: string) {
    const headers = this.getAuthHeader();
    const params = new HttpParams().set('tripId', tripId).set('userId', userId);
    return this.http.get<boolean>(`${env.backendUrl}/trip/is-allowed`, 
    {
      params:  params , 
      headers: headers
    });
  }

  private getAuthHeader():HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStore.getToken()}`
    })
    return headers;
  }
}
