import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flight, IdentityToken } from '../../../models/dtos';
import { AuthStore } from '../../../auth/auth.store';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient, private authStore: AuthStore) { }

  addNewFlight(identity: IdentityToken, tripId: string, flightFormData: Flight) {
    const headers = this.authStore.getAuthHeader();
    return this.http.post<Flight[]>(`${environment.backendUrl}/flight/add/${tripId}`, {...flightFormData, identity}, {headers})
  }

  deleteFlight(identity: IdentityToken, tripId: string, index: number) {
    const headers = this.authStore.getAuthHeader();
    return this.http.put<Flight[]>(`${environment.backendUrl}/flight/delete/${tripId}/${index}`, identity, {headers})
  }
}
