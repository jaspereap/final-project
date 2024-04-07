import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, startWith, switchMap } from 'rxjs';
import { UserDTO } from '../../../../../../models/dtos';
import { UserService } from '../../../../../../shared/services/user.service';

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

  form: FormGroup = this.fb.group(
    {
      payer: this.fb.control<string>('', [Validators.required]),
      cost: this.fb.control<number>(0, [Validators.required]),
      currency: this.fb.control<string>('', [Validators.required])
    }
  )

  ngOnInit(): void {
    this.filteredTripMates = this.form.get('payer')!.valueChanges.pipe(
      switchMap(value => this.userSvc.searchUsers(value))
    )
  }
}
