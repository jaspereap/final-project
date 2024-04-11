import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TripStore } from './trip.store';
import { AuthStore } from '../../auth/auth.store';
import { Observable, Subscription, combineLatest, from, map, of, switchMap, take, toArray } from 'rxjs';
import { TripNotificationService } from './trip-notification.service';
import { MessageType, UserDTO } from '../../models/dtos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { TripDialogComponent } from './tripmate/tripmate-dialog/trip-dialog.component';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-trip-main',
  templateUrl: './trip-main.component.html',
  styleUrl: './trip-main.component.scss',
  providers: [provideComponentStore(TripStore)]
})
export class TripMainComponent implements OnInit {
  tripId!: string;
  currentTrip$ = this.tripStore.currentTrip$;
  days$ = this.tripStore.days$;
  isLoading$ = this.tripStore.isLoading$;
  currentUser$ = this.authStore.user$;
  tripMates$!: Observable<UserDTO[]>;

  constructor(
    private route: ActivatedRoute, 
    private authStore: AuthStore, 
    private tripStore: TripStore, 
    private userService: UserService, 
    private notificationService: TripNotificationService, ) {}

  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];
    this.tripStore.getTripById(this.tripId);
    this.notificationService.listenTripId(this.tripId);
    this.tripMates$ = this.userService.getTripMates(this.tripId);
  }
}