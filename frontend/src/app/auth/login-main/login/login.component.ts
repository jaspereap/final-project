import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../../models/dtos';

import { AuthStore } from '../../auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, 
    private http: HttpClient, 
    private authStore: AuthStore) {
    this.loginForm = this.initLoginForm();
  }

  initLoginForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>('', [Validators.required, Validators.minLength(2)]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(4)])
    })
  }
  login() {
    if (this.loginForm.valid) {
      const loginReq = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      } as LoginRequest
      this.authStore.login(loginReq);
    } else {
      console.log('login form invalid')
    }
    
  }
}
