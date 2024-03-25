import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../models/dtos';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.initRegisterForm();
  }

  initRegisterForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>('bob'),
      email: this.fb.control<string>('bob@email.com'),
      password: this.fb.control<string>('1234'),
      confirmPassword: this.fb.control<string>('1234'),
    })
  }
  register() {
    console.log("Register pressed")
    const formData = this.registerForm.value;
    console.log(formData);
    const user = {
      username: formData['username'],
      email: formData['email'],
      password: formData['password']
    } as User
    this.authService.register(user).subscribe(
      (resp) => {
        console.log('response from server: ', resp)
      }
    );
  }
}
