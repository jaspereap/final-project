import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
  }
  getAuthToken(): string {
    return localStorage.getItem('authToken') ?? '';
  }
}
