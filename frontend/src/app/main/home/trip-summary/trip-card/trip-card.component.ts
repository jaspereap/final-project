import { Component, Input, OnInit } from '@angular/core';
import { TripCard, UserDTO } from '../../../../models/dtos';
import { Router } from '@angular/router';
import { AuthStore } from '../../../../auth/auth.store';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.scss'
})
export class TripCardComponent implements OnInit{
  @Input() tripCard!: TripCard
  @Input() index!: number
  @Input() user!: UserDTO;
  // user = this.authStore.user$;

  constructor(private router: Router, private authStore: AuthStore) {}

  ngOnInit(): void {
    // console.log('Trip Card init')
    // console.log('tripCard: ', this.tripCard)
    // console.log('index: ', this.index)
  }

  openTrip(tripId: string) {
    this.router.navigate([`trip/${tripId}`])
  }
}
