import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Place } from '../../../../../models/dtos';
import { TripService } from '../../../trip.service';
import { ItineraryStore } from '../../itinerary.store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss'
})
export class PlaceComponent implements OnInit, OnChanges{

  @Input() place!: Place;
  @Input() date!: Date;

  editingTime = false;
  
  editingNotes = false;
  editableNotes!: string;

  constructor(private itiStore: ItineraryStore, private route: ActivatedRoute) {}
  tripId!: string;
  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  editTime() {
    this.editingTime = true;
  }
  
  addNotes(date: Date) {
    console.log('add note pressed. date: ', date)
  }

  editNotes() {
    this.editableNotes = this.place.notes;
    this.editingNotes = true;
  }
  saveNotes(date: Date, notes: string) {
    console.log(date, notes)
    // Call a service to save the notes for the place
    this.place.notes = notes;
    this.itiStore.savePlace(
      {
        tripId: this.tripId,
        date: date,
        rank: this.place.rank,
        place: this.place
      }
    )
    this.editingNotes = false;
    // Update the place.notes with the new notes
  }
}
