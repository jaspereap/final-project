import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment as env } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { LoginRequest, User } from '../../models/dtos';
import { LocalStorageService } from '../../local-storage.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private localStore: LocalStorageService) {
    this.loginForm = this.initLoginForm();
  }

  initLoginForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>(''),
      password: this.fb.control<string>('')
    })
  }
  login() {
    console.log('log in clicked')
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(username, password).subscribe(
      (resp) => {
        console.log('server auth response: ', resp)
        this.localStore.setIdToken(resp.authToken)
      }
    )
  }
}
