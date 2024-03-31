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
  displayMarkers: { label: string, latlng: {lat: number, lng: number} }[] = []
  markerOptions: google.maps.MarkerOptions = {draggable: false};

  constructor() {
  }

  ngOnInit(): void {
    console.log('Map init')
    console.log('Lodgings: ', this.lodgings)
    console.log('itinerary days: ', this.itineraryDays)
    // Init displayMarkers
    this.displayMarkers = this.getLodgingMarkers(this.lodgings);
  }

  onSelectionChange(selectedValue: string): void {
    if (selectedValue === 'lodging') {
      this.displayMarkers = [];
      this.displayMarkers = this.getLodgingMarkers(this.lodgings);
    } else {
      this.displayMarkers = [];
      this.displayMarkers = this.getDayMarkers(selectedValue, this.itineraryDays);
    }
  }
  
  getLodgingMarkers(lodgings: Lodging[]) {
    return lodgings.map((lodging, index) => {
      const label = (index + 1).toString();
      return {
        label: label,
        latlng: {lat: lodging.latlng[0], lng: lodging.latlng[1]}
      };
    })
  }

  getDayMarkers(selectedDate: string, days: Day[]) {
    return days
        .filter(day => day.date.toString() === selectedDate.toString())
        .flatMap(day => 
          day.places.map(place => ({
            label: place.rank.toString(),
            latlng: {lat: place.latlng[0], lng: place.latlng[1]}
          })))
  }
}
