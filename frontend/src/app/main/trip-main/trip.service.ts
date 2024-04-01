import { Injectable } from '@angular/core';
import { IdentityRequest, Trip, TripCard, TripRequest } from '../../models/dtos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from "../../../environments/environment";
import { AuthStore } from '../../auth/auth.store';
@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient, private authStore: AuthStore) { }

  addTrip(newTrip: TripRequest): Observable<TripRequest> {
    console.log('trip.service newTrip: ', newTrip)
    const headers = this.authStore.getAuthHeader();
    return this.http.post<TripRequest>(`${env.backendUrl}/trip/new`, newTrip, {headers})
  }

  getTrip(tripId: string) {
    const headers = this.authStore.getAuthHeader();
    return this.http.get<Trip>(`${env.backendUrl}/trip/show/${tripId}`,{headers})
  }

  getTripCards(id: IdentityRequest) {
    const headers = this.authStore.getAuthHeader();
    return this.http.post<any>(`${env.backendUrl}/trip/all`, id, {headers})
  }
}
