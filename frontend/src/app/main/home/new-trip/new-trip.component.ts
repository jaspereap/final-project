import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../trip-main/trip.service';
import { TripRequest } from '../../../models/dtos';
import { countries } from '../../../shared/components/store/country-data-store';
import { Country } from '../../../shared/model/models';
import { Observable, map, startWith } from 'rxjs';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrl: './new-trip.component.scss',
  providers: []
})
export class NewTripComponent implements OnInit{
  constructor(private localStore: LocalStorageService,
      private router: Router,
      private fb: FormBuilder,
      private tripSvc: TripService) {}
  form!: FormGroup;

  countries: Country[] = countries;
  filteredCountries!: Observable<Country[]>

  ngOnInit(): void {
    this.form = this.initForm();

    this.filteredCountries = this.form.get('country')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  initForm(): FormGroup {
    return this.fb.group({
      country: this.fb.control<string>('', [Validators.required]),
      start: this.fb.control<Date>(new Date(), [Validators.required]),
      end: this.fb.control<Date>(new Date(), [Validators.required])
    })
  }

  submit() {
    console.log("submit form pressed ")
    if (this.form.valid) {
      const tripRequest: TripRequest = {
        identity: {username: this.localStore.getUsername(), userId: this.localStore.getUserId()},
        ...this.form.value
      }
      this.tripSvc.addTrip(tripRequest).subscribe(
        (resp) => {
          console.log('Server response: ', resp);
          this.router.navigate([`trip/${resp.id}`])
        }
      );
    } else {
      console.log("form invalid")
    }
  }
  private _filter(value: string): Country[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
  }

}
