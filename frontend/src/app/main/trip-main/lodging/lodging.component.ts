import { Component, Input, OnInit } from '@angular/core';
import { Costing, IdentityToken, Lodging } from '../../../models/dtos';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { TripStore } from '../trip.store';
import { TripNotificationService } from '../trip-notification.service';
import { LodgingDialogComponent } from './lodging-dialog/lodging-dialog.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lodging',
  templateUrl: './lodging.component.html',
  styleUrl: './lodging.component.scss'
})
export class LodgingComponent implements OnInit {
  @Input() lodgings!: Lodging[];
  tripId!: string;

  constructor(
    public dialog: MatDialog, 

    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private tripStore: TripStore,
    private notiSvc: TripNotificationService,
    ) {}
  ngOnInit(): void {
    // console.log('Lodging init')
    this.tripId = this.route.snapshot.params['tripId'];

    this.notiSvc.updateLodging$.subscribe(
      (lodgings) => {
        this.tripStore.setLodgings(lodgings);
      }
    )
  }

  openLodgingDialog() {
    const dialogRef = this.dialog.open(LodgingDialogComponent, {
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
        console.log('Dialog result received: ', result)
        const lodgingFormData: Lodging =  form.value as Lodging;
        const identity = {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()}
        this.tripStore.addLodging({identity, tripId: this.tripId, lodgingFormData})
      }
    })
  }

  deleteLodging(index: number) {
    console.log(index)
    const identity = {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()} as IdentityToken;
    this.tripStore.deleteLodging({identity, tripId: this.tripId, index})
  }

  addCosting(costing: Costing, index: number) {
    this.tripStore.addCostingsToLodging(
      {
        identity: {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()},
        tripId: this.tripId,
        lodgingIndex: index,
        costing: costing
      }
    )
  }

  deleteCosting(i: number, flightIndex: number) {
    this.tripStore.deleteLodgingCosting(
      {
        identity: {userId: Number(this.localStore.getUserId()), username: this.localStore.getUsername()},
        tripId: this.tripId,
        lodgingIndex: flightIndex,
        costingIndex: i
      }
    )
  }
}
