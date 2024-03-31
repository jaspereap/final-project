import { Component, Input } from '@angular/core';
import { Place } from '../../../../../models/dtos';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss'
})
export class PlaceComponent {
  @Input() place!: Place;
}
