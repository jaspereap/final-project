import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDTO } from '../../../models/dtos';
import { Observable, debounceTime, switchMap } from 'rxjs';
import { TripService } from '../trip.service';
import { UserService } from '../../../shared/services/user.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-trip-dialog',
  templateUrl: './trip-dialog.component.html',
  styleUrl: './trip-dialog.component.scss'
})
export class TripDialogComponent implements OnInit{

  tripMateSearch: FormControl = this.fb.control('');
  filteredTripMates$!: Observable<UserDTO[]>;

  constructor(
    private userSvc: UserService,
    public dialogRef: MatDialogRef<TripDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {}

  form: FormGroup = this.fb.group(
    {
      username: this.fb.control<string>('', [Validators.required])
    }
  )

  ngOnInit(): void {
    this.filteredTripMates$ = this.form.get('username')!.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => this.userSvc.searchUsers(value))
    );
  }
}
