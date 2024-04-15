import { Injectable } from '@angular/core';
import { MessageService } from '../shared/services/message.service';
import { MessageType, UserDTO } from '../models/dtos';
import { Subject } from 'rxjs';
import { ChatMessage } from './models/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private msgSvc: MessageService) { }

  newMessage: Subject<ChatMessage> = new Subject;

  subscribeToTripChat(tripId: string) {
    console.log('Subscribed to trip: ', tripId)
    return this.msgSvc.subscribe(`chat/${tripId}`).subscribe(
      (({headers, body}) => {
        // console.log('headers: ', headers)
        // console.log('body: ', body)
        this.newMessage.next(JSON.parse(body) as ChatMessage)
      })
    )
  }
  sendMessage(tripId: string, sender: UserDTO, message: string) {
    const outboundMessage: ChatMessage = {
      sender: sender,
      destination: tripId,
      message: message
    }
    this.msgSvc.publish(`chat/${tripId}`, JSON.stringify(outboundMessage), MessageType.CHAT)
  }

}
