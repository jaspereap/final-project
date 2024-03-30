import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/home/home.component';
import { LoginComponent } from './auth/login-main/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { LoginMainComponent } from './auth/login-main/login-main.component';
import { NewTripComponent } from './main/home/new-trip/new-trip.component';
import { TripMainComponent } from './main/trip-main/trip-main.component';

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
      {path: 'trip/new', component: NewTripComponent},
      {path: 'chatroom', component: ChatroomComponent},
    ]
  },
  {path: 'trip', 
    children: [
      {path: '', component: TripMainComponent}
    ]
  },
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
