import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './auth/logout/logout.component';
import { MessageService } from './shared/message.service';
import { RxStompService } from './rx-stomp/rx-stomp.service';
import { rxStompServiceFactory } from './rx-stomp/rx-stomp-service-factory';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './libraries/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from './libraries/primeng.module';
import { LoginMainComponent } from './auth/login/login-main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TripSummaryComponent } from './main/home/trip-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    LogoutComponent,
    ChatroomComponent,
    LoginMainComponent,
    NavbarComponent,
    TripSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    PrimengModule,
  ],
  providers: [
    MessageService,
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
