import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Place } from '../../../../../models/dtos';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss'
})
export class PlaceComponent implements OnInit, OnChanges{

  @Input() place!: Place;
  @Input() date!: Date;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('\tplace: ', this.place)
    // console.log('\tdate: ', this.date)
    // this.place.start.
  }
  
  addNotes(date: Date) {
    console.log('add note pressed. date: ', date)
  }
}
