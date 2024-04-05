import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../models/dtos';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.initRegisterForm();
  }
  
  
  initRegisterForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>('bob', [Validators.required, Validators.minLength(3)]),
      firstName: this.fb.control<string>('bobby', [Validators.required]),
      lastName: this.fb.control<string>('lee', [Validators.required]),
      email: this.fb.control<string>('bob@email.com', [Validators.required, Validators.email]),
      password: this.fb.control<string>('1234', [Validators.required, Validators.minLength(4)]),
      confirmPassword: this.fb.control<string>('1234', [Validators.required]),
    })
  }
  register() {
    console.log("Register pressed")
    const formData = this.registerForm.value;
    console.log(formData);
    const user = {
      username: formData['username'],
      email: formData['email'],
      password: formData['password'],
      firstName: formData['firstName'],
      lastName: formData['lastName'],
    } as User
    this.authService.register(user).subscribe(
      (resp) => {
        console.log('Register response from server: ', resp)
        this.router.navigate(['auth/login'])
      }
    );
  }
}
