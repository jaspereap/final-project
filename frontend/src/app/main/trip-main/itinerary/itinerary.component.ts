import { Component, Input, OnInit } from '@angular/core';
import { Itinerary } from '../../../models/dtos';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss'
})
export class ItineraryComponent implements OnInit {
  @Input() itinerary!: Itinerary;
  constructor() {}
  ngOnInit(): void {
    
  }
}
