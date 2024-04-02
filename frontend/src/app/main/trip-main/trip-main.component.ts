import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TripStore } from './trip.store';

@Component({
  selector: 'app-trip-main',
  templateUrl: './trip-main.component.html',
  styleUrl: './trip-main.component.scss',
  providers: [provideComponentStore(TripStore)]
})
export class TripMainComponent implements OnInit, OnDestroy{
  tripId!: string;
  currentTrip$ = this.tripStore.currentTrip$;
  isLoading$ = this.tripStore.isLoading$;

  constructor(private route: ActivatedRoute, private tripStore: TripStore) {}

  ngOnInit(): void {
    // console.log("Trip-main init")
    this.tripId = this.route.snapshot.params['tripId'];
    console.log('tripId:', this.tripId)
    // Get Trip details
    this.tripStore.getTripById(this.tripId);
  }
  
  ngOnDestroy() {
    console.log("OnDestroy trigger")
  }
}