import { Injectable } from '@angular/core';
import { User, UserDTO } from '../../models/dtos';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }
  getToken(): string {
    return sessionStorage.getItem('token') ?? '';
  }
  clear() {
    sessionStorage.clear()
  }
  getUser() {
    const user: UserDTO = {
      username: sessionStorage.getItem('username') ?? '',
      firstName: sessionStorage.getItem('firstName') ?? '',
      lastName: sessionStorage.getItem('lastName') ?? '',
      userId: Number(sessionStorage.getItem('userId')),
      email: sessionStorage.getItem('email') ?? '',
    }
    return user;
  }
  getUsername() {
    return sessionStorage.getItem('username') ?? ''
  }
  getUserId() {
    return sessionStorage.getItem('userId') ?? 0
  }
  setUser(user: UserDTO) {
    sessionStorage.setItem('firstName', user.firstName)
    sessionStorage.setItem('lastName', user.lastName)
    sessionStorage.setItem('userId', user.userId.toString())
    sessionStorage.setItem('username', user.username)
    sessionStorage.setItem('email', user.email)
  }
}
