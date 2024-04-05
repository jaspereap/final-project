import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login-main/login/login.component';
import { MainComponent } from './main/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './auth/logout/logout.component';
import { MessageService } from './shared/services/message.service';
import { RxStompService } from './rx-stomp/rx-stomp.service';
import { rxStompServiceFactory } from './rx-stomp/rx-stomp-service-factory';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './libraries/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from './libraries/primeng.module';
import { LoginMainComponent } from './auth/login-main/login-main.component';
import { NavbarComponent } from './main/navbar/navbar.component';
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
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { MtxCalendar } from '@ng-matero/extensions/datetimepicker';
// import { provideNativeDatetimeAdapter } from '@ng-matero/extensions/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TripNotificationService } from './main/trip-main/trip-notification.service';
import { FlightDialogComponent } from './main/trip-main/flight/flight-dialog/flight-dialog.component';

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
    FlightDialogComponent
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
    MatGoogleMapsAutocompleteModule.forRoot('AIzaSyA2prL195ajVFU_yddXDahSG76X4WA3AoI'),
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
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
