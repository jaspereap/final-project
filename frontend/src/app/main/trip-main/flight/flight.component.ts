import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../../../models/dtos';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.scss'
})
export class FlightComponent implements OnInit {
  @Input() flights!: Flight[];
  constructor() {}
  ngOnInit(): void {
    console.log('Flight init')
  }
}
