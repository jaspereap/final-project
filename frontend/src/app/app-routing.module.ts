import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { LoginMainComponent } from './auth/login/login-main.component';
import { NewTripComponent } from './main/home/new-trip/new-trip.component';

const routes: Routes = [
  {path: 'auth', canActivateChild: [],
    children: [
      {path: 'login', component: LoginMainComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  {path: 'home', canActivateChild:[],
    children: [
      {path: '', component: MainComponent},
      {path: 'new/trip', component: NewTripComponent},
      {path: 'chatroom', component: ChatroomComponent},
    ]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
