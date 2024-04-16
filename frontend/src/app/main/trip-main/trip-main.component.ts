import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TripStore } from './trip.store';
import { AuthStore } from '../../auth/auth.store';
import { Observable, Subscription } from 'rxjs';
import { TripNotificationService } from './trip-notification.service';
import { UserDTO } from '../../models/dtos';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-trip-main',
  templateUrl: './trip-main.component.html',
  styleUrl: './trip-main.component.scss',
  providers: [provideComponentStore(TripStore)]
})
export class TripMainComponent implements OnInit, OnDestroy {
  tripId!: string;
  currentTrip$ = this.tripStore.currentTrip$;
  days$ = this.tripStore.days$;
  isLoading$ = this.tripStore.isLoading$;
  currentUser$ = this.authStore.user$;
  tripMates$!: Observable<UserDTO[]>;
  showChat: boolean = false;
  constructor(
    private route: ActivatedRoute, 
    private authStore: AuthStore, 
    private tripStore: TripStore, 
    private userService: UserService, 
    private notificationService: TripNotificationService, ) {}

  // Subscription Management

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];
    this.tripStore.getTripById(this.tripId);
    this.notificationService.listenTripId(this.tripId);
    this.tripMates$ = this.userService.getTripMates(this.tripId);
  }

  toggleChat() {
    if (this.showChat) {
      this.showChat = false;
    } else {
      this.showChat = true;
    }
  }
}