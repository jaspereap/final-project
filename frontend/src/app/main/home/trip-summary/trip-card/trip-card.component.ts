import { Component, Input, OnInit } from '@angular/core';
import { TripCard, UserDTO } from '../../../../models/dtos';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';
import { Observable, map, take } from 'rxjs';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.scss'
})
export class TripCardComponent implements OnInit{
  @Input() tripCard!: TripCard
  @Input() index!: number
  @Input() user!: UserDTO;
  owner$!: Observable<UserDTO>;

  constructor(private router: Router, 
    private userSvc: UserService) {}

  ngOnInit(): void {
    this.owner$ = this.userSvc.getUser(this.tripCard.ownerId);
  }

  openTrip(tripId: string) {
    this.router.navigate([`trip/${tripId}`])
  }

  deleteTrip(tripId: string) {
    console.log(tripId)
  }
}
