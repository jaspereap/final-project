import { Injectable } from '@angular/core';
import { IdentityToken, Itinerary, Place, Trip, TripCard, TripRequest, TripResponse, UserDTO } from '../../models/dtos';
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
    return this.http.get<Trip>(`${env.backendUrl}/trip/show/${tripId}`, {headers})
  }

  getTripCards(id: IdentityToken) {
    const headers = this.authStore.getAuthHeader();
    return this.http.post<any>(`${env.backendUrl}/trip/all`, id, {headers})
  }

  addTripMates(identity: IdentityToken, tripId: string, newUsername: string) {
    const headers = this.authStore.getAuthHeader();
    return this.http.post<Trip>(`${env.backendUrl}/trip/add/trip-mate/${tripId}/${newUsername}`, identity, {headers})
  }
  
  deleteTripMate(identity: IdentityToken, tripId: string, userid: number) {
    const headers = this.authStore.getAuthHeader();
    return this.http.post<Trip>(`${env.backendUrl}/trip/delete/trip-mate/${tripId}/${userid}`, identity, {headers})
  }
}
