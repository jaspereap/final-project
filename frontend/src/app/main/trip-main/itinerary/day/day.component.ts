import { Component, Input } from '@angular/core';
import { Day } from '../../../../models/dtos';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent {
  @Input() day!: Day;
}
