import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Day } from '../../../../models/dtos';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent implements OnInit {
  @Input() day!: Day;
  form!: FormGroup;
  constructor(private fb: FormBuilder ) {

  }
  ngOnInit(): void {
    console.log('Day component init')
    this.form = this.fb.group({
      address: this.fb.control<string>('')
    })
  }

  addPlace(date: Date) {
    console.log('add place pressed. date: ', date)
  }

}
