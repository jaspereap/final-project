import { Injectable } from '@angular/core';
import { User, UserDTO } from '../../models/dtos';

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
  clear() {
    localStorage.clear()
  }
  getUser() {
    const user: UserDTO = {
      username: localStorage.getItem('username') ?? '',
      firstName: localStorage.getItem('firstName') ?? '',
      lastName: localStorage.getItem('lastName') ?? '',
      userId: Number(localStorage.getItem('userId')),
      email: localStorage.getItem('email') ?? '',
    }
    return user;
  }
  getUsername() {
    return localStorage.getItem('username')
  }
  getUserId() {
    return localStorage.getItem('userId')
  }
  setUser(user: UserDTO) {
    localStorage.setItem('firstName', user.firstName)
    localStorage.setItem('lastName', user.lastName)
    localStorage.setItem('userId', user.userId.toString())
    localStorage.setItem('username', user.username)
    localStorage.setItem('email', user.email)
  }
}
