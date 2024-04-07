import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TripStore } from './trip.store';
import { AuthStore } from '../../auth/auth.store';
import { Subscription, combineLatest, map, switchMap, take } from 'rxjs';
import { TripNotificationService } from './trip-notification.service';
import { MessageType } from '../../models/dtos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../shared/services/local-storage.service';

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

  constructor(
    private route: ActivatedRoute, 
    private authStore: AuthStore, 
    private tripStore: TripStore, 
    private notificationService: TripNotificationService) {}

  ngOnInit(): void {
    // console.log("Trip-main init")
    this.tripId = this.route.snapshot.params['tripId'];
    console.log('tripId:', this.tripId)
    // Get Trip details
    this.tripStore.getTripById(this.tripId);
    // Subscribe to tripId websocket
    this.notificationService.listenTripId(this.tripId);
  }
  
  ngOnDestroy() {
    console.log("OnDestroy trigger");
    this.tripIdListener?.unsubscribe();
  }

}