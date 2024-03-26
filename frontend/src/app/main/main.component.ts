import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment as env } from "../../environments/environment";
import { LocalStorageService } from '../local-storage.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  ngOnInit() {
    this.msgSvc.subscribe('test').subscribe(
      (resp) => {
        console.log(resp)
      }
    )
  }
  constructor(private http: HttpClient, 
    private localStore: LocalStorageService,
    private msgSvc: MessageService) {}

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
