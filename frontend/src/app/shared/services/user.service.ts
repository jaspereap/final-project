import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStore } from '../../auth/auth.store';
import { Observable } from 'rxjs';
import { UserDTO } from '../../models/dtos';
import { environment as env} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authStore: AuthStore) { }

  searchUsers(username: string): Observable<UserDTO[]> {
    const headers = this.authStore.getAuthHeader();
    const params = new HttpParams().set('username', username);
    return this.http.get<UserDTO[]>(`${env.backendUrl}/user/search`, 
    {
      params:  params , 
      headers: headers
    });
  }

  getUser(userId: number) {
    const headers = this.authStore.getAuthHeader();
    const params = new HttpParams().set('userId', userId);
    return this.http.get<UserDTO>(`${env.backendUrl}/user/user`, 
    {
      params:  params , 
      headers: headers
    });
  }

}
