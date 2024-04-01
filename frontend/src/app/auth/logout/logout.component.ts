import { Component } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(private localStore: LocalStorageService) {}
  logout() {
    this.localStore.clear();
  }
}
