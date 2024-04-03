import { Component, DoCheck, Input, IterableDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Day, Itinerary } from '../../../models/dtos';
import { TripStore } from '../trip.store';
import { provideComponentStore } from '@ngrx/component-store';
import { ItineraryStore } from './itinerary.store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss',
  providers: [provideComponentStore(ItineraryStore)]
})
export class ItineraryComponent implements OnInit {
  days$ = this.itiStore.days$;
  tripId!: string;

  days!: Day[];

  constructor(private tripStore: TripStore, 
    private itiStore: ItineraryStore, 
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    // console.log('Itinerary init')
    this.tripId = this.route.snapshot.params['tripId'];
    this.itiStore.getItinerary(this.tripId);
  }

}
