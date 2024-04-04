import { Injectable, NgZone } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AddPlaceToDayPayload, Itinerary, Place, Trip } from '../../models/dtos';
import { TripService } from './trip.service';
import { Observable, concatMap, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface TripState {
  currentTrip: Trip | null;
  // currentItinerary: Itinerary | null;
  isLoading: boolean;
  error: string | null | unknown;
}

@Injectable()
export class TripStore extends ComponentStore<TripState> {

  constructor(private tripService: TripService, private router: Router, private ngZone: NgZone) { 
    super({
      currentTrip: null,
      // currentItinerary: null,
      isLoading: false,
      error: null
    })
  }
// Selectors
  readonly currentTrip$ = this.select((state) => state.currentTrip);
  readonly isLoading$ = this.select((state) => state.isLoading);
  readonly error$ = this.select((state) => state.error);
  readonly lodgings$ = this.select(this.currentTrip$, (currentTrip) => currentTrip?.lodgings);
  readonly flights$ = this.select(this.currentTrip$, (currentTrip) => currentTrip?.flightDetails);
  readonly days$ = this.select((state) => state.currentTrip?.itinerary.days)
// Updaters
  readonly setTrip = this.updater((state, trip: Trip) => ({
    ...state,
    currentTrip: trip
  }))
  readonly setItinerary = this.updater((state, newItinerary: Itinerary) => {
    // If there's no currentTrip in the state, log an error or handle as appropriate
    if (!state.currentTrip) {
      console.error('Cannot set itinerary because there is no current trip in the state.');
      return state; // Return the unmodified state
    }
    // If currentTrip is present, update its itinerary
    return ({
      ...state,
      currentTrip: {
        ...state.currentTrip,
        itinerary: newItinerary,
      },
    });
  });
  
// For retrieving a single full trip
  readonly getTripById = this.effect((tripId$: Observable<string>) => 
    tripId$.pipe(
      tap(() => {
        console.log('getTrip triggered')
        // this.patchState({isLoading: true});
      }),
      switchMap((tripId) => 
        this.tripService.getTrip(tripId).pipe(
          tapResponse(
            (resp) => {
              console.log('Get trip server resp: ', resp)
              // this.patchState({ currentTrip: resp, isLoading: false })
              this.setTrip(resp);
            },
            (error) => {
              // this.patchState({ error: error, isLoading: false })
              console.error(error);
            }
          )
        ))
    ))
// For updating place details
  readonly savePlace = this.effect((params$: Observable<{tripId: string, date: Date, rank: number, place: Place}>) => 
    params$.pipe(
      switchMap(param =>
        this.tripService.savePlaceForItineraryDay(param.tripId, param.date, param.rank, param.place).pipe(
          tapResponse(
            (resp) => {
              console.log('Server resp: ', resp)
            },
            (error) => console.error(error)
          )
        ))
    ))

  // Effect to add a place to a day in the itinerary
  readonly addPlaceToItineraryDay = this.effect<AddPlaceToDayPayload>((params$) =>
    params$.pipe(
      tap(() => console.log('\taddPlaceToItineraryDay triggered')),
      concatMap(({ tripId, date, place }) =>
        this.tripService.addPlaceToDay(tripId, date, place).pipe(
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
}
