import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { Flight, Itinerary, Lodging, MessageType } from '../../models/dtos';
import { Observable, Subject, Subscription } from 'rxjs';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripStore } from './trip.store';

@Injectable({
  providedIn: 'root'
})
export class TripNotificationService implements OnInit, OnDestroy{
  
  tripIdListener?: Subscription;
  userIdListener?: Subscription;
  updateItinerary$: Subject<Itinerary> = new Subject();
  updateFlight$: Subject<Flight[]> = new Subject();
  updateLodging$: Subject<Lodging[]> = new Subject();

  constructor(private messageService: MessageService, 
    private localStore: LocalStorageService,
    private _snackBar: MatSnackBar,
    ) { }
  

  ngOnInit(): void {
    console.log('NotificationSvc init')
  }


  listenTripId(tripId: string) {
    this.tripIdListener = this.messageService.subscribe(`trip/${tripId.toString()}`)
    .subscribe(
      (
        {headers, body}) => {
          switch(headers['type'] as MessageType) {
            case MessageType.ITINERARY_MODIFIED: {
              const author = headers['author'];
              this.updateItinerary$.next(JSON.parse(body) as Itinerary);
              if (this.localStore.getUsername() !== author) {
                this.showNotification("Itinerary modified by " + author);
              }
              break;
            }
            case MessageType.ITINERARY_ADDED: {
              const author = headers['author'];
              this.updateItinerary$.next(JSON.parse(body) as Itinerary);
              if (this.localStore.getUsername() !== author) {
                this.showNotification(author + " added a new place to the itinerary!");
              }
              break;
            }
            case MessageType.FLIGHT_ADDED: {
              const author = headers['author'];
              this.updateFlight$.next(JSON.parse(body) as Flight[]);
              if (this.localStore.getUsername() !== author) {
                this.showNotification(author + " added a new flight!");
              }
              break;
            }
            case MessageType.FLIGHT_MODIFIED: {
              const author = headers['author'];
              this.updateFlight$.next(JSON.parse(body) as Flight[]);
              if (this.localStore.getUsername() !== author) {
                this.showNotification(author + " modified the flight!");
              }
              break;
            }
            case MessageType.LODGING_ADDED: {
              const author = headers['author'];
              this.updateLodging$.next(JSON.parse(body) as Lodging[]);
              if (this.localStore.getUsername() !== author) {
                this.showNotification(author + " added a lodging!");
              }
              break;
            }
            case MessageType.LODGING_MODIFIED: {
              const author = headers['author'];
              this.updateLodging$.next(JSON.parse(body) as Lodging[]);
              if (this.localStore.getUsername() !== author) {
                this.showNotification(author + " modified a lodging!");
              }
              break;
            }
          }
        }
    )
  }

// USER ID SUBSCRIPTION
  listenUserId(userId: number | undefined) {
    if (userId !== undefined) {
      this.userIdListener = this.messageService.subscribe(`user/${userId.toString()}`)
      .subscribe(
        ({headers, body}) => {
          switch (headers['type'] as MessageType) {
            case MessageType.MODIFIED: {
              console.log('Someone has modified the trip')
            }
          }
        }
      );
    }
  }

  showNotification(message: string, action: string = 'Close', duration: number = 3000) {
    this._snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'end'
    });
  }

  ngOnDestroy(): void {
    this.userIdListener?.unsubscribe();
    this.tripIdListener?.unsubscribe();
  }
}
