import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../../trip.service';
import { TripRequest } from '../../../models/dtos';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrl: './new-trip.component.scss',
  providers: []
})
export class NewTripComponent implements OnInit{
  constructor(private fb: FormBuilder,
      private tripSvc: TripService) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.initForm();
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
      this.tripSvc.addTrip(this.form.value as TripRequest).subscribe(
        (resp) => {
          console.log(resp)
        }
      );
    } else {
      console.log("form invalid")
    }
  }

}
