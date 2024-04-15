import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { UserDTO } from '../../models/dtos';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  currentUser!: UserDTO;
  
  constructor(
    private localStore: LocalStorageService,
    private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.localStore.getUser();
  }
  logout() {
    this.localStore.clear();
    this.router.navigate(['/auth/login'])
  }
}
