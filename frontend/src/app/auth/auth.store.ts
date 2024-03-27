import { Injectable } from '@angular/core';
import { LoginRequest, User } from '../models/dtos';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AuthService } from './auth.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { LocalStorageService } from '../shared/local-storage.service';
import { Router } from '@angular/router';

export interface AuthState {
  user: User | null
  token: String | null
}

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends ComponentStore<AuthState>{

  constructor(private authSvc: AuthService, private router: Router, private localStore: LocalStorageService) { 
    super({
      user: null,
      token: null
    })
  }
// Selectors
  user$ = this.select((state) => state.user);
  id_token$ = this.select((state) => state.token);
  isAuthenticated$ = this.select((state) => !!state.token && !!state.user)
// Updaters
  readonly setUser = this.updater((state, user: User) => ({
    ...state,
    user: user
  }))
  readonly unsetUser = this.updater((state) => ({
    ...state,
    user: {} as User
  }))
  readonly setToken = this.updater((state, token: String) => ({
    ...state,
    token: token
  }))
  readonly unsetToken = this.updater((state) => ({
    ...state,
    token: ''
  }))
// Login
  readonly login = this.effect((loginRequest$: Observable<LoginRequest>) => 
    loginRequest$.pipe(
      tap(() => console.log('login triggered')),
      switchMap(req => 
        this.authSvc.login(req.username, req.password).pipe(
          tapResponse(
            (resp) => {
              console.log('Login Server Response: ', resp)
              this.setToken(resp.authToken)
              this.setUser(resp.user)
              this.localStore.setToken(resp.authToken)
              this.router.navigate(['home'])
            },
            (error) => console.error(error)
          )
        )
      )
    ))
    
// Logout
  readonly logout = this.effect((trigger$) => 
    trigger$.pipe(
      tap(() => {
        console.log('logout triggered')
        this.unsetToken();
        this.unsetUser();
      }),
    ))
}
