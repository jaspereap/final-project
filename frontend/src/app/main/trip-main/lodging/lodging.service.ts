import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStore } from '../../../auth/auth.store';
import { Costing, IdentityToken, Lodging } from '../../../models/dtos';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LodgingService {

  constructor(private http: HttpClient, private authStore: AuthStore) { }

  addNewLodging(identity: IdentityToken, tripId: string, lodgingFormData: Lodging) {
    const headers = this.authStore.getAuthHeader();
    return this.http.post<Lodging[]>(`${environment.backendUrl}/lodging/add/${tripId}`, {...lodgingFormData, identity}, {headers})
  }

  deleteLodging(identity: IdentityToken, tripId: string, index: number) {
    const headers = this.authStore.getAuthHeader();
    return this.http.put<Lodging[]>(`${environment.backendUrl}/lodging/delete/${tripId}/${index}`, identity, {headers})
  }

  addCostingsToLodging(identity: IdentityToken, tripId: string, lodgingIndex: number, costing: Costing) {
    const headers = this.authStore.getAuthHeader();
    return this.http.post<Lodging[]>(`${environment.backendUrl}/lodging/costings/add/${tripId}/${lodgingIndex}`, {identity, ...costing}, {headers})
  }
  
  deleteLodgingCosting(identity: IdentityToken, tripId: string, lodgingIndex: number, costingIndex: number) {
    const headers = this.authStore.getAuthHeader();
    return this.http.put<Lodging[]>(`${environment.backendUrl}/lodging/costings/delete/${tripId}/${lodgingIndex}/${costingIndex}`, identity, {headers})
  }
}
