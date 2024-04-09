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
import { TripDialogComponent } from './trip-dialog/trip-dialog.component';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

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
  tripMates$!: Observable<UserDTO[]>;

  constructor(
    private route: ActivatedRoute, 
    private localStore: LocalStorageService,
    private authStore: AuthStore, 
    private tripStore: TripStore, 
    private userService: UserService, 
    private notificationService: TripNotificationService,
    public dialog: MatDialog, ) {}

  ngOnInit(): void {
    // console.log("Trip-main init")
    this.tripId = this.route.snapshot.params['tripId'];
    console.log('tripId:', this.tripId)
    // Get Trip details
    this.tripStore.getTripById(this.tripId);
    // Subscribe to tripId websocket
    this.notificationService.listenTripId(this.tripId);

    this.tripMates$ = this.userService.getTripMates(this.tripId);
  }

  openDialog() {
    const dialogRef = this.dialog.open(TripDialogComponent, {
      // Share data with dialog component
      data: {test: 'data'},
      // Dialog config
      height:'500px',
      width:'300px'
    })

    dialogRef.afterClosed().subscribe(result => {
      const form = result as FormGroup;
      console.log('after dialog closed result: ',result)
      if (result !== undefined && result !== null && form.valid) {
        const newUsername =  form.value['username'] as string;
        console.log('form data: ', newUsername)
        this.addTripMate(newUsername);
      }
    })
  }

  addTripMate(username: string) {
    const identity = {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()};
    this.tripStore.addTripMate({identity, tripId: this.tripId, username});
  }

  ngOnDestroy() {
    console.log("OnDestroy trigger");
    this.tripIdListener?.unsubscribe();
  }

}