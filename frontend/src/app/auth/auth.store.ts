import { Injectable } from '@angular/core';
import { LoginRequest, User, UserDTO } from '../models/dtos';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AuthService } from './auth.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

export interface AuthState {
  user: UserDTO | null
  token: String | null

}

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends ComponentStore<AuthState>{

  constructor(private authSvc: AuthService, private router: Router, private localStore: LocalStorageService) { 
    super({
      user: null,
      token: null,
    })
    this.loadAuthFromLocalStorage();
  }

  private loadAuthFromLocalStorage() {
    const token = this.localStore.getToken();
    const user = this.localStore.getUser();
    if (token && user) {
      this.patchState({user: user, token: token})
    }
  }
// Selectors
  user$ = this.select((state) => state.user);
  id_token$ = this.select((state) => state.token);
  isAuthenticated$ = this.select((state) => !!state.token && !!state.user)
// Updaters
  readonly setUser = this.updater((state, user: UserDTO) => ({
    ...state,
    user: user
  }))
  readonly unsetUser = this.updater((state) => ({
    ...state,
    user: {} as UserDTO
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
      switchMap(req => 
        this.authSvc.login(req.username, req.password).pipe(
          tapResponse(
            (resp) => {
              this.setToken(resp.authToken)
              this.setUser(resp.user)
              this.localStore.setToken(resp.authToken)
              this.localStore.setUser(resp.user)
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
        this.unsetToken();
        this.unsetUser();
      }),
    ))

  getAuthHeader():HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStore.getToken()}`
    })
    return headers;
  }
}
