import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { LoginMainComponent } from './auth/login/login-main.component';

const routes: Routes = [
  {path: 'auth/login', component: LoginMainComponent},
  {path: 'auth/logout', component: LogoutComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: 'home', component: MainComponent},
  {path: 'chatroom', component: ChatroomComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
