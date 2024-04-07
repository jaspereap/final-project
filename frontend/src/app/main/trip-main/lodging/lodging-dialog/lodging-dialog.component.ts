import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import PlaceResult = google.maps.places.PlaceResult;
import { CustomPlaceResult } from '../../../../models/itinerary.models';


@Component({
  selector: 'app-lodging-dialog',
  templateUrl: './lodging-dialog.component.html',
  styleUrl: './lodging-dialog.component.scss'
})
export class LodgingDialogComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<LodgingDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {}

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  customPlace!: CustomPlaceResult;

  form: FormGroup = this.fb.group({
    name: this.fb.control<string>('', [Validators.required]),
    notes: this.fb.control<string>(''),
    checkIn: this.fb.control<Date>(new Date(), [Validators.required]),
    checkOut: this.fb.control<Date>(new Date(), [Validators.required]),
    address: this.fb.control<string>(''),
    latlng: this.fb.control<number[]>([]),
  })

  ngOnInit(): void {
    this.initPlaceAutocomplete();
  }

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
      // Use patchValue because Form cannot be modified directly
      this.form.patchValue({
        address: this.customPlace.address,
        latlng: [this.customPlace.latlng?.lat(), this.customPlace.latlng?.lng()]
      })
    });
  }
}
