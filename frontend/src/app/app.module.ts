import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login-main/login/login.component';
import { MainComponent } from './main/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from './shared/services/message.service';
import { RxStompService } from './rx-stomp/rx-stomp.service';
import { rxStompServiceFactory } from './rx-stomp/rx-stomp-service-factory';
import { ChatroomComponent } from './main/chat/chatroom/chatroom.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './libraries/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from './libraries/primeng.module';
import { LoginMainComponent } from './auth/login-main/login-main.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { TripSummaryComponent } from './main/home/trip-summary/trip-summary.component';
import { NewTripComponent } from './main/home/new-trip/new-trip.component';
import {MatNativeDateModule} from '@angular/material/core';
import { TripMainComponent } from './main/trip-main/trip-main.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './main/trip-main/map/map.component';
import { ItineraryComponent } from './main/trip-main/itinerary/itinerary.component';
import { LodgingComponent } from './main/trip-main/lodging/lodging.component';
import { FlightComponent } from './main/trip-main/flight/flight.component';
import { DayComponent } from './main/trip-main/itinerary/day/day.component';
import { PlaceComponent } from './main/trip-main/itinerary/day/place/place.component';
import { TripCardComponent } from './main/home/trip-summary/trip-card/trip-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TripNotificationService } from './main/trip-main/trip-notification.service';
import { FlightDialogComponent } from './main/trip-main/flight/flight-dialog/flight-dialog.component';
import { LodgingDialogComponent } from './main/trip-main/lodging/lodging-dialog/lodging-dialog.component';
import { LandingComponent } from './main/landing/landing.component';
import { CostingDialogComponent } from './shared/components/costing/costing-dialog/costing-dialog.component';
import { TripDialogComponent } from './main/trip-main/tripmate/tripmate-dialog/trip-dialog.component';
import { TripmateComponent } from './main/trip-main/tripmate/tripmate.component';
import { CostingComponent } from './shared/components/costing/costing/costing.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    ChatroomComponent,
    LoginMainComponent,
    NavbarComponent,
    TripSummaryComponent,
    NewTripComponent,
    TripMainComponent,
    MapComponent,
    ItineraryComponent,
    LodgingComponent,
    FlightComponent,
    DayComponent,
    PlaceComponent,
    TripCardComponent,
    FlightDialogComponent,
    LodgingDialogComponent,
    LandingComponent,
    CostingDialogComponent,
    TripDialogComponent,
    TripmateComponent,
    CostingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    MaterialModule,
    PrimengModule,
    MatNativeDateModule,
    FlexLayoutModule,
  ],
  providers: [
    MessageService,
    TripNotificationService,
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory
    },
    provideAnimationsAsync(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
