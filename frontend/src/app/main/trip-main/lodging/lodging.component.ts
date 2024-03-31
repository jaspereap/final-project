import { Component, Input, OnInit } from '@angular/core';
import { Lodging } from '../../../models/dtos';

@Component({
  selector: 'app-lodging',
  templateUrl: './lodging.component.html',
  styleUrl: './lodging.component.scss'
})
export class LodgingComponent implements OnInit {
  @Input() lodgings!: Lodging[];
  constructor() {}
  ngOnInit(): void {
    
  }
}
