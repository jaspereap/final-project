import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../../trip-main/trip.service';
import { IdentityRequest, TripCard, UserDTO } from '../../../models/dtos';
import { AuthStore } from '../../../auth/auth.store';

@Component({
  selector: 'app-trip-summary',
  templateUrl: './trip-summary.component.html',
  styleUrl: './trip-summary.component.scss'
})
export class TripSummaryComponent implements OnInit {
  user = this.authStore.user$;

  trips: string[] = ['hello', 'test'];
  tripCards: TripCard[] = [];
  constructor(private authStore: AuthStore, private router: Router, private tripSvc: TripService) {}

  ngOnInit(): void {
    console.log('Trip summary init')
    
    const id: IdentityRequest = {
      username: localStorage.getItem('username') ?? '',
      userId: Number(localStorage.getItem('userId'))
    }

    this.tripSvc.getTripCards(id).subscribe({
      next: (tripCards) => {
        console.log('tripCards: ', tripCards)
        this.tripCards = tripCards},
      error: (error) => console.error(error),
      complete: () => console.log('complete')
    })
  }

  newTrip() {
    console.log('new trip pressed')
    this.router.navigate(['/home/new-trip'])
  }
}
