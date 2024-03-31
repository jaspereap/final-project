import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from './trip.service';
import { provideComponentStore } from '@ngrx/component-store';
import { TripStore } from './trip.store';
import { Trip } from '../../models/dtos';

@Component({
  selector: 'app-trip-main',
  templateUrl: './trip-main.component.html',
  styleUrl: './trip-main.component.scss',
  providers: [provideComponentStore(TripStore)]
})
export class TripMainComponent implements OnInit, OnDestroy{
  tripId!: string;

  constructor(private route: ActivatedRoute, private tripSvc: TripService, private tripStore: TripStore) {}

  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];
    console.log('tripId:', this.tripId)
    this.tripSvc.getTrip(this.tripId).subscribe(
      (resp) => {
        const trip = resp as Trip;
        console.log(trip)
        console.log(trip.lodgings[0].costings[0])
        
      }
    );
  }
  ngOnDestroy() {

  }
}