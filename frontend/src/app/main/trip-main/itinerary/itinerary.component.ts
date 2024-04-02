import { Component, Input, OnInit } from '@angular/core';
import { Itinerary } from '../../../models/dtos';
import { TripStore } from '../trip.store';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss'
})
export class ItineraryComponent implements OnInit {
  // @Input() itinerary!: Itinerary;

  itinerary$ = this.tripStore.currentItinerary$;

  constructor(private tripStore: TripStore, ) {}
  ngOnInit(): void {
    console.log('Itinerary init')
    this.itinerary$.subscribe(
      (x) => {console.log('itinerary$: ', x)}
    )
  }
}
