import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/home/home.component';
import { LoginComponent } from './auth/login-main/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChatroomComponent } from './main/chat/chatroom/chatroom.component';
import { LoginMainComponent } from './auth/login-main/login-main.component';
import { NewTripComponent } from './main/home/new-trip/new-trip.component';
import { TripMainComponent } from './main/trip-main/trip-main.component';
import { authGuard } from './guards/auth.guard';
import { canViewTripGuard } from './guards/can-view-trip.guard';
import { LandingComponent } from './main/landing/landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'auth', canActivateChild: [],
    children: [
      {path: 'login', component: LoginMainComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  {path: 'home', canActivateChild:[authGuard],
    children: [
      {path: '', component: MainComponent},
      {path: 'new-trip', component: NewTripComponent},
      {path: 'chatroom', component: ChatroomComponent},
    ]
  },
  {path: 'trip', canActivateChild: [authGuard, canViewTripGuard],
    children: [
      {path: ':tripId', component: TripMainComponent}
    ]
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
