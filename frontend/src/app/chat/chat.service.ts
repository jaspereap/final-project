import { Injectable } from '@angular/core';
import { MessageService } from '../shared/message.service';
import { MessageType } from '../models/dtos';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private msgSvc: MessageService) { }

  subscribeToRoom(roomId: string) {
    console.log('Subscribed to room: ', roomId)
    return this.msgSvc.subscribe(`chat/${roomId}`).subscribe(
      (({headers, body}) => {
        console.log(headers)
        console.log(body)
      })
    )
  }
  sendMessage(roomId: string, message: string) {
    this.msgSvc.publish(`chat/${roomId}`, message, MessageType.CHAT)
  }

}
