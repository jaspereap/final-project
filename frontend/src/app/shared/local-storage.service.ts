import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
  clearToken() {
    localStorage.removeItem('token');
  }
}
