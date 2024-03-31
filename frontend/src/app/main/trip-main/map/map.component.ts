import { Component, Input, OnInit } from '@angular/core';
import { Day, Itinerary, Lodging, PlaceMarker } from '../../../models/dtos';
import { environment as env } from "../../../../environments/environment";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  @Input() lodgings!: Lodging[];
  @Input() itineraryDays!: Day[];

  // Google Map API
  mapId: string = env.mapId;
  // Map Options
  center: google.maps.LatLngLiteral = {lat: 1.35, lng: 103.8};
  zoom = 10;
  // Marker Options
  displayMarkers: { label: string, lat: number, lng: number}[] = []

  markerOptions: google.maps.MarkerOptions = {draggable: false};

  constructor() {
    // Mock
    this.displayMarkers.push(
      {label: '1', lat: 1.35, lng: 103.8}
    )
  }

  ngOnInit(): void {
    console.log('Map init')
    // console.log('markerLocations: ', this.markerLocations)
    console.log('Lodgings: ', this.lodgings)
    console.log('itinerary days: ', this.itineraryDays)
  }
  onSelectionChange(selectedValue: string): void {
    console.log(selectedValue)
    if (selectedValue === 'lodging') {
      console.log('lodging')
    }
  }
  
}
