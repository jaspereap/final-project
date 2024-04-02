import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AddPlaceToDayPayload, Itinerary, Trip } from '../../models/dtos';
import { TripService } from './trip.service';
import { Observable, concatMap, switchMap, tap } from 'rxjs';

export interface TripState {
  currentTrip: Trip | null;
  currentItinerary: Itinerary | null;
  isLoading: boolean;
  error: string | null | unknown;
}

@Injectable()
export class TripStore extends ComponentStore<TripState> {

  constructor(private tripService: TripService) { 
    super({
      currentTrip: null,
      currentItinerary: null,
      isLoading: false,
      error: null
    })
  }
// Selectors
  readonly currentTrip$ = this.select((state) => state.currentTrip);
  readonly currentItinerary$ = this.select((state) => state.currentItinerary);
  readonly isLoading$ = this.select((state) => state.isLoading);
  readonly error$ = this.select((state) => state.error);
  readonly lodgings$ = this.select(this.currentTrip$, (currentTrip) => currentTrip?.lodgings);
  readonly flights$ = this.select(this.currentTrip$, (currentTrip) => currentTrip?.flightDetails);

// Updaters

  readonly setTrip = this.updater((state, trip: Trip) => ({
    ...state,
    currentTrip: trip
  }))
  readonly setItinerary = this.updater((state, itinerary: Itinerary) => ({
    ...state,
    currentItinerary: itinerary
  }));

  // Effect to add a place to a day in the itinerary
  readonly addPlaceToItineraryDay = this.effect<AddPlaceToDayPayload>((params$) =>
    params$.pipe(
      tap(() => console.log('addPlaceToItineraryDay triggered')),
      concatMap(({ tripId, date, place }) =>
        this.tripService.addPlaceToDay(tripId, date, place).pipe(
          tapResponse(
            (resp: Itinerary) => {
              console.log('Server response: ', resp)
              // this.patchState({ currentTrip: updatedTrip, isLoading: false });
              // this.setTrip(updatedTrip);
              this.setItinerary(resp);
              console.log('setItinerary ran')
            },
            (error) => {
              console.error('Error adding place to day', error);
              this.patchState({ isLoading: false });
            }
          )
        )
      )
    )
  );

  readonly getTripById = this.effect((tripId$: Observable<string>) => 
    tripId$.pipe(
      tap(() => {
        console.log('getTrip triggered')
        this.patchState({isLoading: true});
      }),
      switchMap((tripId) => 
        this.tripService.getTrip(tripId).pipe(
          tapResponse(
            (resp) => {
              this.patchState({ currentTrip: resp, currentItinerary: resp.itinerary, isLoading: false })
            },
            (error) => {
              this.patchState({ error: error, isLoading: false })
            }
          )
        ))
    ))
}
