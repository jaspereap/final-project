import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AddPlacePayload, AddPlaceToDayPayload, Day, Itinerary, Place } from '../../../models/dtos';
import { TripService } from '../trip.service';
import { Observable, Subject, concatMap, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { TripStore } from '../trip.store';

export interface ItineraryState {
  id: string | null
  days: Day[]
}

@Injectable()
export class ItineraryStore extends ComponentStore<ItineraryState>{

  constructor(private tripSvc: TripService, private router: Router, private tripStore: TripStore) { 
    super({
      id: null,
      days: []
    })
  }
  readonly days$ = this.select((state) => state.days)

  readonly addDay = this.updater((state, newDay: Day) => ({
    ...state,
    days: [...state.days, newDay]
  }));

  readonly addPlaceToDay = this.updater((state, payload: AddPlacePayload) => ({
    ...state,
    days: state.days.map(day =>
      day.date === payload.date
        ? {
            ...day,
            places: [...day.places, payload.place]
          }
        : day
    )
  }));
  
  readonly setItinerary = this.updater((state, iti: Itinerary) => ({
    ...state,
    id: iti.id,
    days: iti.days
  }))

  // Effect to add a place to a day in the itinerary
  readonly addPlaceToItineraryDay = this.effect<AddPlaceToDayPayload>((params$) =>
    params$.pipe(
      tap(() => console.log('\taddPlaceToItineraryDay triggered')),
      concatMap(({ tripId, date, place }) =>
        this.tripSvc.addPlaceToDay(tripId, date, place).pipe(
          tapResponse(
            (resp: Itinerary) => {
              console.log('Server response: ', resp)
              this.setItinerary(resp);
              console.log('setItinerary ran')
              // this.tripStore.getTripById(tripId);
            },
            (error) => {
              console.error('Error adding place to day', error);
            }
          )
        )
      )
    )
  );

  readonly getItinerary = this.effect((tripId$: Observable<string>) => 
    tripId$.pipe(
      switchMap(tripId =>
        this.tripSvc.getItineraryByTripId(tripId).pipe(
          tapResponse(
            (resp) => {
              console.log('Server resp: ', resp)
              this.setItinerary(resp)
            },
            (error) => console.error(error)
          )
        )
      )
    )  
  )

}
