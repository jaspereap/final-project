import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Day } from '../../../../models/dtos';
import { FormBuilder, FormGroup } from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent implements OnInit {
  @Input() day!: Day;
  form!: FormGroup;
  
  // Places Autocomplete API
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  constructor(private fb: FormBuilder, private ngZone: NgZone) {}

  ngOnInit(): void {
    console.log('Day component init')
    this.initPlaceAutocomplete();
  }

  private initPlaceAutocomplete(): void {
    const options = {
      types: ['establishment']
    }
    const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement, options);
    console.log(autocomplete);
    autocomplete.addListener('place_changed', () => {
      const place: PlaceResult = autocomplete.getPlace();
      console.log(place);
      // Handle the selected place information.
      // Update searchControl value if necessary
    });
  }

  addPlace(date: Date) {
    console.log('add place pressed. date: ', date)
    console.log(this.form.get('address'))
  }
}
