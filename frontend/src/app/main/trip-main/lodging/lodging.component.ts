import { Component, Input, OnInit } from '@angular/core';
import { Lodging } from '../../../models/dtos';
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
  constructor(
    public dialog: MatDialog, 

    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private tripStore: TripStore,
    private notiSvc: TripNotificationService,
    ) {}
  ngOnInit(): void {
    // console.log('Lodging init')
  }

  openDialog() {
    const dialogRef = this.dialog.open(LodgingDialogComponent, {
      // Share data with dialog component
      data: {test: 'data'},
      // Dialog config
      height:'600px',
      width:'400px'
    })

    dialogRef.afterClosed().subscribe(result => {
      const form = result as FormGroup;
      if (form.valid) {

      }
    })
  }
}
