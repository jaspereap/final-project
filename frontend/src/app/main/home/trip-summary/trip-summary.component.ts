import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../../trip-main/trip.service';
import { IdentityToken, TripCard, UserDTO } from '../../../models/dtos';
import { AuthStore } from '../../../auth/auth.store';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-trip-summary',
  templateUrl: './trip-summary.component.html',
  styleUrl: './trip-summary.component.scss'
})
export class TripSummaryComponent implements OnInit {
  user = this.authStore.user$;

  trips: string[] = ['hello', 'test'];
  tripCards: TripCard[] = [];
  constructor(private authStore: AuthStore, 
    private router: Router, 
    private tripSvc: TripService, 
    private localStore: LocalStorageService) {}

  ngOnInit(): void {
    
    const identity: IdentityToken = {
      username: this.localStore.getUsername() ?? '',
      userId: Number(this.localStore.getUserId())
    }

    this.tripSvc.getTripCards(identity).subscribe({
      next: (tripCards) => {
        this.tripCards = tripCards},
      error: (error) => {
        console.error(error); 
        this.router.navigate(['/auth/login']);
      }
    })
  }

  newTrip() {
    this.router.navigate(['/home/new-trip'])
  }
}
