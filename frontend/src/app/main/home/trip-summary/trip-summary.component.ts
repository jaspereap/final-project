import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-summary',
  templateUrl: './trip-summary.component.html',
  styleUrl: './trip-summary.component.scss'
})
export class TripSummaryComponent implements OnInit {
  trips: string[] = ['hello', 'test'];
  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  newTrip() {
    console.log('new trip pressed')
    this.router.navigate(['/home/new/trip'])
  }
}
