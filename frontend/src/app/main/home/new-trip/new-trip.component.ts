import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../trip-main/trip.service';
import { TripRequest, UserDTO } from '../../../models/dtos';
import { countries } from '../../../shared/components/store/country-data-store';
import { Country } from '../../../shared/model/shared-models';
import { Observable, debounceTime, map, startWith, switchMap, tap } from 'rxjs';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

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
      private tripSvc: TripService,
      private userSvc: UserService) {}
  form!: FormGroup;

  countries: Country[] = countries;
  filteredCountries!: Observable<Country[]>

  tripMateSearch: FormControl = this.fb.control('');
  filteredTripMates!: Observable<UserDTO[]>;

  ngOnInit(): void {
    this.form = this.initForm();

    this.filteredCountries = this.form.get('country')!.valueChanges.pipe(
      debounceTime(300),
      map(value => this._filterCountries(value)),
    );

    this.filteredTripMates = this.tripMateSearch.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => this.userSvc.searchUsers(value))
    );
  }

  initForm(): FormGroup {
    return this.fb.group({
      country: this.fb.control<string>('', [Validators.required]),
      start: this.fb.control<Date>(new Date(), [Validators.required]),
      end: this.fb.control<Date>(new Date(), [Validators.required]),
      tripMates: this.fb.array([])
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
  // Getter is required for template to reference the FormArray
  get tripMatesFormArray() {
    return this.form.get('tripMates') as FormArray;
  }

  addTripMate(mate: UserDTO) {
    const tripMates = this.form.get('tripMates') as FormArray;
    if (tripMates != null) {
      tripMates.push(this.fb.group(mate));
      this.tripMateSearch.reset();
    }
  }

  removeTripMate(index: number) {
    const tripMates = this.form.get('tripMates') as FormArray;
    tripMates.removeAt(index);
  }

  private _filterCountries(value: string): Country[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
  }
}
