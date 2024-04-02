import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { CustomPlaceResult, Day, Place } from '../../../../models/dtos';
import { FormBuilder, FormGroup } from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;
import { TripService } from '../../trip.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent implements OnInit {
  @Input() day!: Day;
  form!: FormGroup;
  tripId!: string;
  // Places Autocomplete API
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  constructor(private tripSvc: TripService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('Day component init')
    this.tripId = this.route.snapshot.params['tripId'];
    this.initPlaceAutocomplete();
  }

  private initPlaceAutocomplete(): void {
    const options = {
      types: ['establishment']
    }
    const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement, options);
    autocomplete.addListener('place_changed', () => {
      const place: PlaceResult = autocomplete.getPlace();
      const customPlace: CustomPlaceResult = {
        name: place.name,
        address: place.formatted_address,
        latlng: place.geometry?.location
      }
      console.log(customPlace);
      // Handle the selected place information.
      // Update searchControl value if necessary
      this.addPlace(this.day.date, customPlace)
    });
  }

  addPlace(date: Date, placeResult: PlaceResult) {
    console.log('add place pressed. date: ', date, 'placeResult: ', placeResult)
    this.tripSvc.addPlaceToDay(this.tripId, date, placeResult).subscribe(
      (resp) => {
        console.log('server resp: ', resp)
      }
    );
  }
}
