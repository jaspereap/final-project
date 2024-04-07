import { Injectable } from '@angular/core';
import { IdentityToken, Itinerary, Place, Trip, TripCard, TripRequest, TripResponse } from '../../models/dtos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from "../../../environments/environment";
import { AuthStore } from '../../auth/auth.store';
import PlaceResult = google.maps.places.PlaceResult;
import { CustomPlaceResult } from '../../models/itinerary.models';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient, private authStore: AuthStore) { }

  addTrip(newTrip: TripRequest): Observable<TripResponse> {
    console.log('trip.service newTrip: ', newTrip)
    const headers = this.authStore.getAuthHeader();
    return this.http.post<TripResponse>(`${env.backendUrl}/trip/new`, newTrip, {headers})
  }

  getTrip(tripId: string) {
    const headers = this.authStore.getAuthHeader();
    return this.http.get<Trip>(`${env.backendUrl}/trip/show/${tripId}`,{headers})
  }

  getTripCards(id: IdentityToken) {
    const headers = this.authStore.getAuthHeader();
    return this.http.post<any>(`${env.backendUrl}/trip/all`, id, {headers})
  }

  getItineraryByTripId(tripId: string) {
    const headers = this.authStore.getAuthHeader();
    return this.http.get<Itinerary>(`${env.backendUrl}/itinerary/get/${tripId}`,{headers})
  }
  
  addPlaceToDay(identity: IdentityToken,tripId:string, date: Date, place: CustomPlaceResult) {
    const headers = this.authStore.getAuthHeader();
    return this.http.post<Itinerary>(`${env.backendUrl}/itinerary/add/${tripId}/${date}`, {...place, identity}, {headers})
  }

  savePlaceForItineraryDay(identity: IdentityToken, tripId: string, date: Date, rank: number, place: Place) {
    const headers = this.authStore.getAuthHeader();
    return this.http.put(`${env.backendUrl}/itinerary/update/${tripId}/${date.getTime()}/${rank}`, {...place, identity}, {headers})
  }
}
