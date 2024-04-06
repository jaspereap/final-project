import { Component, DoCheck, Input, IterableDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Day, Itinerary } from '../../../models/dtos';
import { TripStore } from '../trip.store';
import { provideComponentStore } from '@ngrx/component-store';
// import { ItineraryStore } from './itinerary.store';
import { ActivatedRoute } from '@angular/router';
import { TripNotificationService } from '../trip-notification.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss',
  // providers: [provideComponentStore(TripStore)]
})
export class ItineraryComponent implements OnInit {
  // days$ = this.tripStore.days$;
  tripId!: string;

  @Input()
  days!: Day[];

  constructor(
    private tripStore: TripStore,
    private notiSvc: TripNotificationService,
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];
    this.notiSvc.updateItinerary$.subscribe(
      (itinerary) => {
        this.tripStore.setItinerary(itinerary);
      }
    )
  }

}
