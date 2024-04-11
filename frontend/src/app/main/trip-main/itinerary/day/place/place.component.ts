import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Costing, Place } from '../../../../../models/dtos';
import { TripService } from '../../../trip.service';
import { ActivatedRoute } from '@angular/router';
import { TripStore } from '../../../trip.store';
import { LocalStorageService } from '../../../../../shared/services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { CostingDialogComponent } from './costing-dialog/costing-dialog.component';
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

  openDialog() {
    const dialogRef = this.dialog.open(CostingDialogComponent, {
      // Share data with dialog component
      data: {tripId: this.tripId},
      // Dialog config
      height:'400px',
      width:'280px'
    })

    dialogRef.afterClosed().subscribe(result => {
      const form = result as FormGroup;
      console.log('after dialog closed result: ',result)
      if (result !== undefined && result !== null && form.valid) {
        const costingFormData: Costing =  form.value as Costing;
        this.addCosting(costingFormData)
      }
    })
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
    this.tripStore.deleteCosting(
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
