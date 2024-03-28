import { Injectable } from '@angular/core';
import { TripRequest } from './models/dtos';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from "../environments/environment";
import { LocalStorageService } from './shared/local-storage.service';
import { AuthStore } from './auth/auth.store';
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
}
