import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Place } from '../../../../../models/dtos';
import { TripService } from '../../../trip.service';
import { ActivatedRoute } from '@angular/router';
import { TripStore } from '../../../trip.store';
import { LocalStorageService } from '../../../../../shared/services/local-storage.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss',
})
export class PlaceComponent implements OnInit {

  @Input() place!: Place;
  @Input() date!: Date;
  @Input() index!: number;

  editingTime = false;
  editableStart!: Date;
  editableEnd!: Date;
  editingNotes = false;
  editableNotes!: string;

  constructor(
    // private itiStore: ItineraryStore, 
    private tripStore: TripStore,
    private route: ActivatedRoute,
    private localStore: LocalStorageService) {}

  tripId!: string;
  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];
    this.date = new Date(this.date);
    this.place.start = new Date(this.place.start);
    this.place.end = new Date(this.place.end);
    // console.log('initial: ', this.place.start.getTime())
  }

  deletePlace() {
    this.tripStore.deletePlace(
      {
        identity: {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()},
        tripId: this.tripId,
        date: this.date,
        rank: this.index
      }
    )
  }

  editTime() {
    this.editableStart = this.date;
    this.editableEnd = this.date;
    console.log('editable start: ', this.editableStart)
    console.log('editable end: ', this.editableEnd)
    this.editingTime = true;
  }
  
  saveUpdatedTimes() {
    this.place.start = new Date(this.convertTimeToMillis(this.editableStart.toString()) + this.date.getTime() );
    this.place.end = new Date(this.convertTimeToMillis(this.editableEnd.toString()) + this.date.getTime());
    this.tripStore.savePlace(
      {
        identity: {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()},
        tripId: this.tripId,
        date: this.date,
        rank: this.place.rank,
        place: this.place
      }
    )
    this.editingTime = false;
  }

  convertTimeToMillis(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    // Convert hours to milliseconds and add minutes converted to milliseconds
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
  }

  editNotes() {
    this.editableNotes = this.place.notes;
    this.editingNotes = true;
  }
  saveNotes(notes: string) {
    console.log(this.date, notes)
    // Call a service to save the notes for the place
    this.place.notes = notes;
    this.tripStore.savePlace(
      {
        identity: {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()},
        tripId: this.tripId,
        date: this.date,
        rank: this.place.rank,
        place: this.place
      }
    )
    this.editingNotes = false;
    // Update the place.notes with the new notes
  }
}
