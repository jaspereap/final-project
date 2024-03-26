import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setIdToken(token: string) {
    localStorage.setItem('id_token', token);
  }
  getIdToken(): string {
    return localStorage.getItem('id_token') ?? '';
  }
  clearIdToken() {
    localStorage.removeItem('id_token');
  }
}
