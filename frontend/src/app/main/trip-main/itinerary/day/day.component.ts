import { ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CustomPlaceResult, Day, Place } from '../../../../models/dtos';
import { FormBuilder, FormGroup } from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;
import { TripService } from '../../trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TripStore } from '../../trip.store';

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
      private router: Router
      ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('change detected: ', changes)
  }

  ngOnInit(): void {
    // console.log('Day component init')
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

      this.tripStore.addPlaceToItineraryDay(
        {
          tripId: this.tripId,
          date: this.day.date,
          place: customPlace
        }
      )
      this.searchInput.nativeElement.value = '';

    });
  }

  addPlace(date: Date, customPlaceResult: CustomPlaceResult) {
    console.log('add place pressed. date: ', date, 'customPlaceResult: ', customPlaceResult)
    this.tripSvc.addPlaceToDay(this.tripId, date, customPlaceResult).subscribe(
      (resp) => {
        console.log('server resp: ', resp)
        this.searchInput.nativeElement.value = '';
        this.tripStore.getTripById(this.tripId);
      },
      (error) => console.error('Error adding place: ', error)
    );
  }
}
