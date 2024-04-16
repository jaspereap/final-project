import { Injectable } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { MessageType, UserDTO } from '../../models/dtos';
import { Subject } from 'rxjs';
import { ChatMessage } from './models/ChatMessage';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from '../../auth/auth.store';
import { environment as env } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private msgSvc: MessageService,
    private authStore: AuthStore,
    private http: HttpClient) { }

  newMessage: Subject<ChatMessage> = new Subject;

  subscribeToTripChat(tripId: string) {
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

  getHistory(tripId: string) {
    const headers = this.authStore.getAuthHeader();
    return this.http.get<ChatMessage[]>(`${env.backendUrl}/chat/history/${tripId}`, {headers})
  }
}
