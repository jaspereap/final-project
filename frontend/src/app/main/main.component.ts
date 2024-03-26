import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment as env } from "../../environments/environment";
import { LocalStorageService } from '../local-storage.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(private http: HttpClient, private localStore: LocalStorageService) {}

  test() {
    console.log('test pressed')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStore.getIdToken()}`
    })
    this.http.get(`${env.backendUrl}/test`, { headers : headers }).subscribe(
      (resp) => {
        console.log(resp)
      }
    )
  }
}
