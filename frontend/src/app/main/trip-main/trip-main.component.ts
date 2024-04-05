import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TripStore } from './trip.store';
import { AuthStore } from '../../auth/auth.store';
import { Subscription, combineLatest, map, switchMap, take } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
import { Itinerary, MessageType } from '../../models/dtos';

@Component({
  selector: 'app-trip-main',
  templateUrl: './trip-main.component.html',
  styleUrl: './trip-main.component.scss',
  providers: [provideComponentStore(TripStore)]
})
export class TripMainComponent implements OnInit, OnDestroy{
  tripId!: string;
  currentTrip$ = this.tripStore.currentTrip$;
  days$ = this.tripStore.days$;
  isLoading$ = this.tripStore.isLoading$;
  currentUser$ = this.authStore.user$;
  tripIdListener?: Subscription;

  constructor(private route: ActivatedRoute, 
    private authStore: AuthStore, 
    private tripStore: TripStore, 
    private notificationService: NotificationService,
    private router: Router) {}

  ngOnInit(): void {
    // console.log("Trip-main init")
    this.tripId = this.route.snapshot.params['tripId'];
    console.log('tripId:', this.tripId)
    // Get Trip details
    this.tripStore.getTripById(this.tripId);
    // Subscribe to tripId websocket
    this.listenTripId(this.tripId);

  }
  
  // TRIP ID SUBSCRIPTION
  listenTripId(tripId: string) {
    this.tripIdListener = this.notificationService.listenTripId(tripId)
    .subscribe(
      (
        {headers, body}) => {
          switch(headers['type'] as MessageType) {
            case MessageType.ITINERARY_MODIFIED: {
              console.log('Itinerary modified')
              console.log(JSON.parse(body))
              this.tripStore.setItinerary(JSON.parse(body) as Itinerary);
              // this.tripStore.getTripById(tripId)
            }
          }
        }
    )
  }

  ngOnDestroy() {
    console.log("OnDestroy trigger");
    this.tripIdListener?.unsubscribe();
  }

}