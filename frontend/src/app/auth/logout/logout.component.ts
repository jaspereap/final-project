import { Component } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private localStore: LocalStorageService) {}
  logout() {
    this.localStore.clearIdToken();
  }
}
