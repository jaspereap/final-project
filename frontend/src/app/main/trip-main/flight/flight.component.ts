import { Component, Input, OnInit } from '@angular/core';
import { Costing, Flight, IdentityToken } from '../../../models/dtos';
import { MatDialog } from '@angular/material/dialog';
import { FlightDialogComponent } from './flight-dialog/flight-dialog.component';
import { FlightService } from './flight.service';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { TripStore } from '../trip.store';
import { TripNotificationService } from '../trip-notification.service';
import { FormGroup } from '@angular/forms';
import { CostingDialogComponent } from '../../../shared/components/costing/costing-dialog/costing-dialog.component';

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
    this.tripId = this.route.snapshot.params['tripId'];

    this.notiSvc.updateFlight$.subscribe(
      (flightDetails) => {
        this.tripStore.setFlightDetails(flightDetails);
      }
    )
  }

  openFlightDialog() {
    const dialogRef = this.dialog.open(FlightDialogComponent, {
      // Share data with dialog component
      data: {test: 'data'},
      // Dialog config
      height:'600px',
      width:'400px'
    })

    dialogRef.afterClosed().subscribe(result => {
      const form = result as FormGroup;
      // console.log('after dialog closed result: ',result)
      if (result !== undefined && result !== null && form.valid) {
        const flightFormData: Flight =  form.value as Flight;
        this.addFlight(flightFormData);
      }
    })
  }
  
  addFlight(flight: Flight) {
    const identity = {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()}
    this.tripStore.addFlight({identity, tripId: this.tripId, flightFormData: flight})
  }

  deleteFlight(index: number) {
    console.log(index)
    const identity = {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()} as IdentityToken;
    this.tripStore.deleteFlight({identity, tripId: this.tripId, index})
  }

  addCosting(costing: Costing, index: number) {
    this.tripStore.addCostingsToFlight(
      {
        identity: {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()},
        tripId: this.tripId,
        flightIndex: index,
        costing: costing
      }
    )
  }

  deleteCosting(i: number, flightIndex: number) {
    this.tripStore.deleteFlightCosting(
      {
        identity: {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()},
        tripId: this.tripId,
        flightIndex: flightIndex,
        costingIndex: i
      }
    )
  }
}
