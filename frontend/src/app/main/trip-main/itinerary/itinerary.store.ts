import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AddPlacePayload, AddPlaceToDayPayload, CustomPlaceResult, Day, IdentityToken, Itinerary, Place } from '../../../models/dtos';
import { TripService } from '../trip.service';
import { Observable, Subject, concatMap, map, switchMap, tap } from 'rxjs';
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
  // readonly days$ = this.select((state) => state.days)
  
  // readonly setItinerary = this.updater((state, iti: Itinerary) => ({
  //   ...state,
  //   id: iti.id,
  //   days: iti.days
  // }))

  // // Effect to add a place to a day in the itinerary
  // readonly addPlaceToItineraryDay = this.effect((params$: Observable<{identity: IdentityToken, tripId:string, date: Date, place: CustomPlaceResult}>) =>
  //   params$.pipe(
  //     tap(() => console.log('\taddPlaceToItineraryDay triggered')),
  //     concatMap(({ identity, tripId, date, place }) =>
  //       this.tripSvc.addPlaceToDay(identity, tripId, date, place).pipe(
  //         tapResponse(
  //           (resp: Itinerary) => {
  //             console.log('Server response: ', resp)
  //             this.setItinerary(resp);
  //             console.log('setItinerary ran')
  //             // this.tripStore.getTripById(tripId);
  //           },
  //           (error) => {
  //             console.error('Error adding place to day', error);
  //           }
  //         )
  //       )
  //     )
  //   )
  // );

  // readonly getItinerary = this.effect((tripId$: Observable<string>) => 
  //   tripId$.pipe(
  //     switchMap(tripId =>
  //       this.tripSvc.getItineraryByTripId(tripId).pipe(
  //         tapResponse(
  //           (resp) => {
  //             console.log('Get iti Server resp: ', resp)
  //             this.setItinerary(resp)
  //           },
  //           (error) => console.error(error)
  //         )
  //       )
  //     )
  //   )  
  // )

  // readonly savePlace = this.effect((params$: Observable<{identity: IdentityToken, tripId: string, date: Date, rank: number, place: Place}>) => 
  //   params$.pipe(
  //     switchMap(param =>
  //       this.tripSvc.savePlaceForItineraryDay(param.identity, param.tripId, param.date, param.rank, param.place).pipe(
  //         tapResponse(
  //           (resp) => {
  //             console.log('Server resp: ', resp)
  //           },
  //           (error) => console.error(error)
  //         )
  //       ))
  //   ))
}
