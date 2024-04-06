import { Component } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private localStore: LocalStorageService, private router: Router) {}
  toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu?.classList.toggle('hidden');
  }
  logout() {
    this.localStore.clear();
    this.router.navigate(['/auth/login'])
  }
}
