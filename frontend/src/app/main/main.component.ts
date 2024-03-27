import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment as env } from "../../environments/environment";
import { LocalStorageService } from '../shared/local-storage.service';
import { MessageService } from '../shared/message.service';
import { AuthStore } from '../auth/auth.store';
import { withLatestFrom } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  isAuthenticated$ = this.authStore.isAuthenticated$;
  user$ = this.authStore.user$;

  ngOnInit() {
    this.isAuthenticated$.pipe(withLatestFrom(this.user$)).subscribe(
      (([isAuthenticated, user]) => {
        console.log('user: ' , user)
        console.log('isAuthenticated: ', isAuthenticated)
      })
    )
  }
  constructor(private http: HttpClient, 
    private localStore: LocalStorageService,
    private msgSvc: MessageService,
    private authStore: AuthStore) {}

  test() {
    console.log('test pressed')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStore.getToken()}`
    })
    this.http.get(`/test`, { headers : headers }).subscribe(
      (resp) => {
        console.log(resp)
      }
    )
  }
}
