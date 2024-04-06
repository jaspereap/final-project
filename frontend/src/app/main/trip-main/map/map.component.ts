import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Day, Lodging, Marker } from '../../../models/dtos';
import { environment as env } from "../../../../environments/environment";
import LatLngLiteral = google.maps.LatLngLiteral;
import { ItineraryStore } from '../itinerary/itinerary.store';
import { provideComponentStore } from '@ngrx/component-store';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  providers: [provideComponentStore(ItineraryStore)]
})
export class MapComponent implements OnInit, OnChanges {
  @Input() lodgings!: Lodging[];
  @Input() itineraryDays!: Day[];

  // Google Map API
  mapId: string = env.mapId;
  // Map Options
  center: LatLngLiteral = {lat: 1.35, lng: 103.8};
  zoom = 10;
  // Marker Options
  displayMarkers: Marker[] = []
  markerOptions: google.maps.MarkerOptions = {draggable: false};

  constructor(private itiStore: ItineraryStore) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('map changes: ', changes)
  }

  ngOnInit(): void {
    if (this.lodgings.length !== 0) {
      this.center = {
        lat: this.lodgings[0].latlng[0],
        lng: this.lodgings[0].latlng[1]
      }
      
    } else if (this.itineraryDays.length !== 0 && this.itineraryDays[0].places.length !== 0) {
      this.center = {
        lat: this.itineraryDays[0].places[0].latlng[0],
        lng: this.itineraryDays[0].places[0].latlng[1]
      }
    }
    this.displayMarkers = this.getAllLodgingMarkers(this.lodgings);
  }

  selected: string = 'lodging';
  onSelectionChange(value: string): void {
    this.selected = value
    this.displayMarkers = [];
    if (value === 'lodging') {
      this.displayMarkers = this.getAllLodgingMarkers(this.lodgings);
    } else {
      this.displayMarkers = [
          ...this.getDayMarkers(value, this.itineraryDays),
          ...this.getLodgingMarkers(value, this.lodgings)]
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
