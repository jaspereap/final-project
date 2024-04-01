import { Component, Input, OnInit } from '@angular/core';
import { TripCard } from '../../../../models/dtos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.scss'
})
export class TripCardComponent implements OnInit{
  @Input() tripCard!: TripCard
  @Input() index!: number

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Trip Card init')
    console.log('tripCard: ', this.tripCard)
    console.log('index: ', this.index)
  }

  openTrip(tripId: string) {
    this.router.navigate([`trip/${tripId}`])
  }
}
