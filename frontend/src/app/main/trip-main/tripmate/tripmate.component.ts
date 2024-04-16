import { Component, Input, OnInit } from '@angular/core';
import { Trip, UserDTO } from '../../../models/dtos';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { TripStore } from '../trip.store';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TripDialogComponent } from './tripmate-dialog/trip-dialog.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tripmate',
  templateUrl: './tripmate.component.html',
  styleUrl: './tripmate.component.scss'
})
export class TripmateComponent implements OnInit{
  @Input() tripMates$!: Observable<UserDTO[]>;
  @Input() currentUser$!: Observable<UserDTO | null>;
  @Input() currentTrip$!: Observable<Trip | null>;
  tripId!: string;

  constructor(private localStore: LocalStorageService, 
    private tripStore: TripStore, 
    private route: ActivatedRoute,
    public dialog: MatDialog) {}
  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];
  }
  addTripMate(username: string) {
    const identity = {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()};
    this.tripStore.addTripMate({identity, tripId: this.tripId, username});
  }
  deleteTripMate(userId: number) {
    const confirmed = window.confirm('Are you sure you want to delete this trip mate?');
    console.log(userId)
    if (confirmed) {
      const identity = {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()};
      this.tripStore.deleteTripMate({identity, tripId: this.tripId, userId})
    }
  }
  openTripDialog() {
    const dialogRef = this.dialog.open(TripDialogComponent, {
      height:'500px',
      width:'300px'
    })

    dialogRef.afterClosed().subscribe(result => {
      const form = result as FormGroup;
      if (result !== undefined && result !== null && form.valid) {
        const newUsername =  form.value['username'] as string;
        this.addTripMate(newUsername);
      }
    })
  }
}
