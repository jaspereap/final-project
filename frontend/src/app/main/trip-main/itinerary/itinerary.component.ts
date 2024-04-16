import { Component, DoCheck, Input, IterableDiffers, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Day } from '../../../models/dtos';
import { TripStore } from '../trip.store';
import { provideComponentStore } from '@ngrx/component-store';
// import { ItineraryStore } from './itinerary.store';
import { ActivatedRoute } from '@angular/router';
import { TripNotificationService } from '../trip-notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss',
  // providers: [provideComponentStore(TripStore)]
})
export class ItineraryComponent implements OnInit, OnDestroy{
  // days$ = this.tripStore.days$;
  tripId!: string;

  @Input()
  days!: Day[];

  constructor(
    private tripStore: TripStore,
    private notiSvc: TripNotificationService,
    private route: ActivatedRoute,) {}

  notiSub?: Subscription;

  ngOnDestroy(): void {
    this.notiSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];
    this.notiSub = this.notiSvc.updateItinerary$.subscribe(
      (itinerary) => {
        this.tripStore.setItinerary(itinerary);
      }
    )
  }

}
