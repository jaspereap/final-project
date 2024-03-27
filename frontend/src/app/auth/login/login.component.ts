import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment as env } from "../../../environments/environment";
import { Observable, of } from 'rxjs';
import { LoginRequest, User } from '../../models/dtos';
import { LocalStorageService } from '../../shared/local-storage.service';
import { AuthService } from '../auth.service';
import { AuthStore } from '../auth.store';

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
      password: this.fb.control<string>('', [Validators.required])
    })
  }
  login() {
    console.log('log in clicked')
    if (this.loginForm.valid) {
      console.log('login form valid: ', this.loginForm.value)
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
