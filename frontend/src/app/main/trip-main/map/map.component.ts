import { Component, Input, OnInit } from '@angular/core';
import { Day, Itinerary, Lodging, Marker } from '../../../models/dtos';
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
  displayMarkers: Marker[] = []
  markerOptions: google.maps.MarkerOptions = {draggable: false};

  constructor() {
  }

  ngOnInit(): void {
    console.log('Map init')
    console.log('Lodgings: ', this.lodgings)
    console.log('itinerary days: ', this.itineraryDays)
    // Init displayMarkers
    this.displayMarkers = this.getAllLodgingMarkers(this.lodgings);
  }

  onSelectionChange(selectedValue: string): void {
    this.displayMarkers = [];
    if (selectedValue === 'lodging') {
      this.displayMarkers = this.getAllLodgingMarkers(this.lodgings);
    } else {
      this.displayMarkers = [
          ...this.getDayMarkers(selectedValue, this.itineraryDays),
          ...this.getLodgingMarkers(selectedValue, this.lodgings)]
    }
  }
  
  getAllLodgingMarkers(lodgings: Lodging[]): Marker[] {
    return lodgings.map((lodging, index) => {
      const label = (index + 1).toString();
      return {
        label: label,
        latlng: {lat: lodging.latlng[0], lng: lodging.latlng[1]}
      };
    })
  }

  getDayMarkers(selectedDate: string, days: Day[]): Marker[] {
    return days
        .filter(day => day.date.toString() === selectedDate.toString())
        .flatMap(day => 
          day.places.map(place => ({
            label: place.rank.toString(),
            latlng: {lat: place.latlng[0], lng: place.latlng[1]}
          })))
  }
  getLodgingMarkers(selectedDate: string, lodgings: Lodging[]): Marker[] {
    return lodgings
      .filter(lodging => {
        // Convert string to Date object before calling getTime()
        const checkInDate = new Date(Number(lodging.checkIn));
        const checkOutDate = new Date(Number(lodging.checkOut));
        const selectedDateTime = Number(selectedDate);
        return selectedDateTime >= checkInDate.getTime() && selectedDateTime <= checkOutDate.getTime();
      })
      .map((lodging) => {
        const label = `L`;
        return {
          label: label,
          latlng: {lat: lodging.latlng[0], lng: lodging.latlng[1]}
        };
      });
  }
  
}
