import { ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CustomPlaceResult, Day, Place } from '../../../../models/dtos';
import { FormBuilder, FormGroup } from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;
import { TripService } from '../../trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TripStore } from '../../trip.store';
import { ItineraryStore } from '../itinerary.store';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent implements OnInit, OnChanges {
  @Input() day!: Day;

  form!: FormGroup;
  tripId!: string;

  // Places Autocomplete API
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  constructor(private tripSvc: TripService,
      private tripStore: TripStore,
      private route: ActivatedRoute,
      private router: Router,
      // private itiStore: ItineraryStore
      ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('\tDAY CHANGED: ')
  }

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
      console.log('Autcomplete: ', this.customPlace);
    });
  }

  addPlace() {
    this.tripStore.addPlaceToItineraryDay(
      {
        tripId: this.tripId,
        date: this.day.date,
        place: this.customPlace
      }
    )
    this.searchInput.nativeElement.value = '';
  }
}
