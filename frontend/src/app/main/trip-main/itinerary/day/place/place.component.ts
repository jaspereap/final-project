import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Costing, Place } from '../../../../../models/dtos';
import { TripService } from '../../../trip.service';
import { ActivatedRoute } from '@angular/router';
import { TripStore } from '../../../trip.store';
import { LocalStorageService } from '../../../../../shared/services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { CostingDialogComponent } from '../../../../../shared/components/costing/costing-dialog/costing-dialog.component';
import { FormGroup } from '@angular/forms';

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

  noDate = new Date(0);
  constructor(
    public dialog: MatDialog, 
    private tripStore: TripStore,
    private route: ActivatedRoute,
    private localStore: LocalStorageService) {}

  tripId!: string;
  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];
    this.date = new Date(this.date);
    this.place.start = new Date(this.place.start);
    this.place.end = new Date(this.place.end);
  }

  deletePlace() {
    const confirmed = window.confirm('Are you sure you want to delete this place?');
    if (confirmed) {
      this.tripStore.deletePlace(
        {
          identity: {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()},
          tripId: this.tripId,
          date: this.date,
          rank: this.index
        }
      )
    }
  }

  editTime() {
    this.editableStart = this.date;
    this.editableEnd = this.date;
    this.editingTime = true;
  }
  
  saveUpdatedTimes() {
    this.place.start = new Date(this.convertTimeToMillis(this.editableStart.toString()) + this.date.getTime() );
    this.place.end = new Date(this.convertTimeToMillis(this.editableEnd.toString()) + this.date.getTime());
    if (this.place.start.toJSON() !== null && this.place.end.toJSON() !== null ) {
      this.tripStore.savePlace(
        {
          identity: {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()},
          tripId: this.tripId,
          date: this.date,
          rank: this.place.rank,
          place: this.place
        }
      )
    }
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
  }

  addCosting(costing: Costing) {
    this.tripStore.addCostingsToPlace(
      {
        identity: {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()},
        tripId: this.tripId,
        date: this.date,
        rank: this.index,
        costing: costing
      }
    )
  }

  deleteCosting(i: number) {
    const confirmed = window.confirm('Are you sure you want to delete this costing?');
    if (confirmed) {
      this.tripStore.deletePlaceCosting(
        {
          identity: {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()},
          tripId: this.tripId,
          date: this.date,
          rank: this.index,
          costingIndex: i
        }
      )
    }
  }
}
