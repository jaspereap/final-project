import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Trip } from '../../models/dtos';
import { TripService } from './trip.service';
import { Observable, switchMap, tap } from 'rxjs';

export interface TripState {
  currentTrip: Trip | null;
  isLoading: boolean;
  error: string | null | unknown;
}

@Injectable()
export class TripStore extends ComponentStore<TripState> {

  constructor(private tripService: TripService) { 
    super({
      currentTrip: null,
      isLoading: false,
      error: null
    })
  }
// Selectors
  readonly currentTrip$ = this.select((state) => state.currentTrip);
  readonly isLoading$ = this.select((state) => state.isLoading);
  readonly error$ = this.select((state) => state.error);

// Updaters
  readonly setTrip = this.updater((state, trip: Trip) => ({
    ...state,
    currentTrip: trip
  }))


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
              this.patchState({ currentTrip: resp, isLoading: false })
            },
            (error) => {
              this.patchState({ error: error, isLoading: false })
            }
          )
        ))
    ))
}
