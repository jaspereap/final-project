import { Injectable } from '@angular/core';
import { IdentityToken, Itinerary } from '../../../models/dtos';
import { AuthStore } from '../../../auth/auth.store';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  constructor(private http: HttpClient, private authStore: AuthStore) { }

  deletePlace(identity: IdentityToken, tripId: string, date: Date, rank: number) {
    const headers = this.authStore.getAuthHeader();
    return this.http.put<Itinerary>(`${environment.backendUrl}/itinerary/delete/${tripId}/${date.getTime()}/${rank}`, identity, {headers})
  }
}
