import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from './trip.service';
import { provideComponentStore } from '@ngrx/component-store';
import { TripStore } from './trip.store';
import { Trip } from '../../models/dtos';
import { Observable } from 'rxjs';

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
    console.log("OnInit trigger")
    this.tripId = this.route.snapshot.params['tripId'];
    console.log('tripId:', this.tripId)
    this.tripStore.getTripById(this.tripId);
    this.currentTrip$.subscribe(
      (trip) => {
        console.log("Current trip: ", trip)
      }
    )

    this.isLoading$.subscribe(
      (loading) => {
        console.log('isLoading: ', loading)
      }
    )
  }
  ngOnDestroy() {
    console.log("OnDestroy trigger")
  }
}