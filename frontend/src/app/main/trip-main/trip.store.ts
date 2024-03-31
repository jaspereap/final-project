import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface TripState {
  tripId: string
}

@Injectable()
export class TripStore extends ComponentStore<TripState> {

  constructor() { 
    super({
      tripId: ''
    })
  }
}
