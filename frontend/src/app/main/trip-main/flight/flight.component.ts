import { Component, Input, OnInit } from '@angular/core';
import { Flight, IdentityToken } from '../../../models/dtos';
import { MatDialog } from '@angular/material/dialog';
import { FlightDialogComponent } from './flight-dialog/flight-dialog.component';
import { FlightService } from './flight.service';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { TripStore } from '../trip.store';
import { TripNotificationService } from '../trip-notification.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.scss'
})
export class FlightComponent implements OnInit {
  @Input() flights!: Flight[];
  tripId!: string;

  constructor(
    public dialog: MatDialog, 
    private flightSvc: FlightService,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private tripStore: TripStore,
    private notiSvc: TripNotificationService,
    ) {}

  ngOnInit(): void {
    // console.log('Flight init')
    this.tripId = this.route.snapshot.params['tripId'];

    this.notiSvc.updateFlight$.subscribe(
      (flightDetails) => {
        this.tripStore.setFlightDetails(flightDetails);
      }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(FlightDialogComponent, {
      // Share data with dialog component
      data: {test: 'data'},
      // Dialog config
      height:'600px',
      width:'400px'
    })

    dialogRef.afterClosed().subscribe(result => {
      const form = result as FormGroup;
      console.log('after dialog closed result: ',result)
      if (result !== undefined && result !== null && form.valid) {
        const flightFormData: Flight =  form.value as Flight;
        const identity = {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()}
        this.tripStore.addFlight({identity, tripId: this.tripId, flightFormData})
      }
    })
  }

  deleteFlight(index: number) {
    console.log(index)
    const identity = {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()} as IdentityToken;
    this.tripStore.deleteFlight({identity, tripId: this.tripId, index})
  }
}
