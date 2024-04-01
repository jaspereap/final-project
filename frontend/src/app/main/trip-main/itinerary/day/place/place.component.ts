import { Component, Input, OnInit } from '@angular/core';
import { Place } from '../../../../../models/dtos';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss'
})
export class PlaceComponent implements OnInit {
  @Input() place!: Place;
  @Input() date!: Date;
  ngOnInit(): void {
    console.log('Place component init')
    console.log('Place is: ', this.place)
  }

  addNotes(date: Date) {
    console.log('add note pressed. date: ', date)
  }
}
