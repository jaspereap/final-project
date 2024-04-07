import { Injectable, NgZone } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Costing, Flight, IdentityToken, Itinerary, Lodging, Place, Trip } from '../../models/dtos';
import { TripService } from './trip.service';
import { Observable, concatMap, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { FlightService } from './flight/flight.service';
import { LodgingService } from './lodging/lodging.service';
import { ItineraryService } from './itinerary/itinerary.service';
import { CostingsPlaceRequest, DeleteCostingPlaceRequest, DeletePlaceRequest, NewPlaceRequest, UpdatePlaceRequest } from '../../models/itinerary.requests';

export interface TripState {
  currentTrip: Trip | null;
  // currentItinerary: Itinerary | null;
  isLoading: boolean;
  error: string | null | unknown;
}

@Injectable()
export class TripStore extends ComponentStore<TripState> {

  constructor(private tripService: TripService, private router: Router, private ngZone: NgZone, private flightService: FlightService, private lodgingService: LodgingService, private itineraryService: ItineraryService) { 
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
  // Set Trip
  readonly setTrip = this.updater((state, trip: Trip) => ({
    ...state,
    currentTrip: trip
  }))
  
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
              this.router.navigate(['/auth/login'])
              console.error(error);
            }
          )
        ))
    ))

// Set Itinerary
  readonly setItinerary = this.updater((state, newItinerary: Itinerary) => {
    console.log('\tSetting itinerary..')
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

  // For updating place details
  readonly savePlace = this.effect((params$: Observable<UpdatePlaceRequest>) => 
    params$.pipe(
      switchMap(param =>
        this.tripService.savePlaceForItineraryDay(param.identity, param.tripId, param.date, param.rank, param.place).pipe(
          tapResponse(
            (resp) => {
              console.log('Server resp: ', resp)
            },
            (error) => console.error(error)
          )
        ))
    ))

  // Effect to add a place to a day in the itinerary
  readonly addPlaceToItineraryDay = this.effect((params$: Observable<NewPlaceRequest>) =>
  // readonly addPlaceToItineraryDay = this.effect((params$: Observable<{identity: IdentityToken, tripId:string, date: Date, place: CustomPlaceResult}>) =>
    params$.pipe(
      tap(() => console.log('\taddPlaceToItineraryDay triggered')),
      concatMap(({ identity, tripId, date, place }) =>
      this.tripService.addPlaceToDay(identity, tripId, date, place).pipe(
          tapResponse(
            (resp: Itinerary) => {
              console.log('Server response: ', resp)
              this.setItinerary(resp);
            },
            (error) => {
              console.error('Error adding place to day', error);
            }
          )
        )
      )
    )
  );
  // To delete a Place in Itinerary
  readonly deletePlace = this.effect((params$: Observable<DeletePlaceRequest>) =>
    params$.pipe(
      tap(() => console.log('\tdelete place triggered')),
      switchMap((params) => {
        return this.itineraryService.deletePlace(params.identity, params.tripId, params.date, params.rank).pipe(
          tapResponse(
            (resp: Itinerary) => {
              console.log('Server resp: ', resp)
              this.setItinerary(resp)
            },
            (err) => console.error(err)
          )
        );
      })
    )
  )
  readonly addCostingsToPlace = this.effect((params$: Observable<CostingsPlaceRequest>) =>
    params$.pipe(
      tap(() => console.log('\tadd costings to place triggered')),
      switchMap((params) => {
        return this.itineraryService.addCostingsToPlace(params.identity, params.tripId, params.date, params.rank, params.costing).pipe(
          tapResponse(
            (resp: Itinerary) => {
              console.log('Server resp: ', resp)
              this.setItinerary(resp)
            },
            (error) => console.error(error)
          )
        )
      })
    )
  )
  readonly deleteCosting = this.effect((params$: Observable<DeleteCostingPlaceRequest>) =>
    params$.pipe(
      tap(() => console.log('\tdelete costings triggered')),
      switchMap((params) => {
        return this.itineraryService.deleteCosting(params.identity, params.tripId, params.date, params.rank, params.costingIndex).pipe(
          tapResponse(
            (resp: Itinerary) => {
              console.log('Server resp: ', resp)
              this.setItinerary(resp)
            },
            (error) => console.error(error)
          )
        )
      })
    )
  )

// Set Flights
  readonly setFlightDetails = this.updater((state, newFlights: Flight[]) => {
    console.log('\tSetting flight..')
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
        flightDetails: newFlights,
      },
    });
  });

  // To add Flight details
  readonly addFlight = this.effect((params$: Observable<{identity: IdentityToken, tripId: string, flightFormData: Flight}>) =>
  params$.pipe(
    tap(() => console.log('\tadd Flight triggered')),
    switchMap((params) => {
      return this.flightService.addNewFlight(params.identity, params.tripId, params.flightFormData).pipe(
        tapResponse(
          (resp: Flight[]) => {
            console.log('Server resp: ', resp)
            this.setFlightDetails(resp)
          },
          (err) => console.error(err)
        )
      );
    })
  ))
  // To delete a Flight
  readonly deleteFlight = this.effect((params$: Observable<{identity: IdentityToken, tripId: string, index: number}>) =>
  params$.pipe(
    tap(() => console.log('\tdelete flight triggered')),
    switchMap((params) => {
      return this.flightService.deleteFlight(params.identity, params.tripId, params.index).pipe(
        tapResponse(
          (resp: Flight[]) => {
            console.log('Server resp: ', resp)
            this.setFlightDetails(resp)
          },
          (err) => console.error(err)
        )
      );
    })
  )
  )


// Set Lodgings
  readonly setLodgings = this.updater((state, newLodgings: Lodging[]) => {
    console.log('\tSetting lodgings..')
    // If there's no currentTrip in the state, log an error or handle as appropriate
    if (!state.currentTrip) {
      console.error('Cannot set lodgings because there is no current trip in the state.');
      return state; // Return the unmodified state
    }
    // If currentTrip is present, update its itinerary
    return ({
      ...state,
      currentTrip: {
        ...state.currentTrip,
        lodgings: newLodgings,
      },
    });
  });
  // To add Lodging details
  readonly addLodging = this.effect((params$: Observable<{identity: IdentityToken, tripId: string, lodgingFormData: Lodging}>) =>
    params$.pipe(
      tap(() => console.log('\tadd Lodging triggered')),
      switchMap((params) => {
        return this.lodgingService.addNewLodging(params.identity, params.tripId, params.lodgingFormData).pipe(
          tapResponse(
            (resp: Lodging[]) => {
              console.log('add lodging Server resp: ', resp)
              this.setLodgings(resp)
            },
            (err) => console.error(err)
          )
        );
      })
    ))

 // To delete a Lodging
 readonly deleteLodging = this.effect((params$: Observable<{identity: IdentityToken, tripId: string, index: number}>) =>
  params$.pipe(
    tap(() => console.log('\tdelete lodging triggered')),
    switchMap((params) => {
      return this.lodgingService.deleteLodging(params.identity, params.tripId, params.index).pipe(
        tapResponse(
          (resp: Lodging[]) => {
            console.log('Delete lodging Server resp: ', resp)
            this.setLodgings(resp)
          },
          (err) => console.error(err)
        )
      );
    })
  )
  )
}
