import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, debounceTime, startWith, switchMap } from 'rxjs';
import { UserDTO } from '../../../../models/dtos';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-costing-dialog',
  templateUrl: './costing-dialog.component.html',
  styleUrl: './costing-dialog.component.scss'
})
export class CostingDialogComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<CostingDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userSvc: UserService) {}

  filteredTripMates!: Observable<UserDTO[]>;
  tripId!: string;
  form: FormGroup = this.fb.group(
    {
      payer: this.fb.control<string>('', [Validators.required]),
      cost: this.fb.control<number>(0, [Validators.required, Validators.min(0.01)]),
      currency: this.fb.control<string>('SGD', [Validators.required])
    }
  )

  ngOnInit(): void {
    this.tripId = this.data.tripId;
    console.log('TRIPID: ', this.tripId)
    this.filteredTripMates = this.userSvc.getTripMates(this.tripId);
  }
}
