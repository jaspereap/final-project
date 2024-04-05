import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment as env } from "../../../environments/environment";
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { MessageService } from '../../shared/services/message.service';
import { AuthStore } from '../../auth/auth.store';
import { withLatestFrom } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
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

}
