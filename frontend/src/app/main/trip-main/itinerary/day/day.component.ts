import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CustomPlaceResult, Day } from '../../../../models/dtos';
import { FormGroup } from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;
import { TripService } from '../../trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TripStore } from '../../trip.store';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

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

  constructor(private tripSvc: TripService,
      private tripStore: TripStore,
      private route: ActivatedRoute,
      private router: Router,
      private localStore: LocalStorageService,
      // private itiStore: ItineraryStore
      ) {}

  ngOnInit(): void {
    // console.log('Day component init')
    this.tripId = this.route.snapshot.params['tripId'];
    this.initPlaceAutocomplete();
  }

  customPlace!: CustomPlaceResult;

  private initPlaceAutocomplete(): void {
    const options = {
      types: ['establishment']
    }
    const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement, options);
    autocomplete.addListener('place_changed', () => {
      const place: PlaceResult = autocomplete.getPlace();
      this.customPlace = {
        name: place.name,
        address: place.formatted_address,
        latlng: place.geometry?.location,
        image: place.photos ? place.photos[0].getUrl({maxHeight: 1000, maxWidth: 1000}) : ''
      }
      // console.log('Autocomplete: ', this.customPlace);
    });
  }

  addPlace() {
    this.tripStore.addPlaceToItineraryDay(
      {
        identity: {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()},
        tripId: this.tripId,
        date: this.day.date,
        place: this.customPlace
      }
    )
    this.searchInput.nativeElement.value = '';
  }
}
