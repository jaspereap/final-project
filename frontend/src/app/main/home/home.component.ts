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

  ngOnInit() {}

  constructor(private http: HttpClient, 
    private authStore: AuthStore) {}

}
