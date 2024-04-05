import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { MessageType } from '../../models/dtos';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit, OnDestroy{

  constructor(private messageService: MessageService) { }
  userIdListener?: Subscription;
  

  ngOnInit(): void {
    console.log('NotificationSvc init')
  }
// Get tripId Websocket observable
  listenTripId(tripId: string) {
    return this.messageService.subscribe(`trip/${tripId.toString()}`)
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

  ngOnDestroy(): void {
    this.userIdListener?.unsubscribe();
  }
}
