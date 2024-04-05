import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lodging-dialog',
  templateUrl: './lodging-dialog.component.html',
  styleUrl: './lodging-dialog.component.scss'
})
export class LodgingDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LodgingDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {}

  form: FormGroup = this.fb.group({
    name: this.fb.control<string>('', [Validators.required]),
    notes: this.fb.control<string>(''),
    checkIn: this.fb.control<Date>(new Date(), [Validators.required]),
    checkOut: this.fb.control<Date>(new Date(), [Validators.required]),
    address: this.fb.control<string>(''),
  })

  onNoClick() {
    this.dialogRef.close();
  }
}
