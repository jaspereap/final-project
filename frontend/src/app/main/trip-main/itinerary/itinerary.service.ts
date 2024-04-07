import { Injectable } from '@angular/core';
import { Costing, IdentityToken, Itinerary } from '../../../models/dtos';
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
  
  addCostingsToPlace(identity: IdentityToken, tripId: string, date: Date, rank: number, costing: Costing) {
    const headers = this.authStore.getAuthHeader();
    return this.http.post<Itinerary>(`${environment.backendUrl}/itinerary/costings/add/${tripId}/${date.getTime()}/${rank}`, {identity, ...costing}, {headers})
  }
  
  deleteCosting(identity: IdentityToken, tripId: string, date: Date, rank: number, costingIndex: number) {
    const headers = this.authStore.getAuthHeader();
    return this.http.put<Itinerary>(`${environment.backendUrl}/itinerary/costings/delete/${tripId}/${date.getTime()}/${rank}/${costingIndex}`, identity, {headers})
  }
}
