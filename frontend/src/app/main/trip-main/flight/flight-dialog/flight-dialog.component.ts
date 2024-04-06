import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { countries } from '../../../../shared/components/store/country-data-store';
import { Country } from '../../../../shared/model/models';
import { Observable, debounceTime, map, startWith } from 'rxjs';

@Component({
  selector: 'app-flight-dialog',
  templateUrl: './flight-dialog.component.html',
  styleUrl: './flight-dialog.component.scss'
})
export class FlightDialogComponent implements OnInit{

  countries: Country[] = countries;
  filteredDeparture!: Observable<Country[]> | undefined;
  filteredArrival!: Observable<Country[]> | undefined;

  // To access data passed to dialog component, use MAT_DIALOG_DATA injection token.
  constructor(
    public dialogRef: MatDialogRef<FlightDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {}

  form: FormGroup = this.fb.group({
    airlineName: this.fb.control<string>(''),
    flightNumber: this.fb.control<string>(''),
    departureCountry: this.fb.control<string>('', [Validators.required]),
    arrivalCountry: this.fb.control<string>('', [Validators.required]),
    departureDate: this.fb.control<Date>(new Date()),
    arrivalDate: this.fb.control<Date>(new Date()),
    notes: this.fb.control<string>(''),
    image: this.fb.control<string>(''),
  })

  ngOnInit(): void {
    this.filteredDeparture = this.form.get('departureCountry')?.valueChanges
    .pipe(
      startWith(''),
      debounceTime(300), 
      map(
        (value) => this.countries
          .filter(country => {
            return country.name.toLowerCase().includes(value.toLowerCase())
          })
    ))

    this.filteredArrival = this.form.get('arrivalCountry')?.valueChanges
    .pipe(
      startWith(''),
      debounceTime(300), 
      map(
        (value) => this.countries
          .filter(country => {
            return country.name.toLowerCase().includes(value.toLowerCase())
          })
    ))

  }

}
