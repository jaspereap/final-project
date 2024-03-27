import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { MessageService } from '../../shared/message.service';
import { MessageType } from '../../models/dtos';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss'
})
export class ChatroomComponent implements OnInit {
  constructor(private http: HttpClient, 
    private localStore: LocalStorageService,
    private msgSvc: MessageService,
    private chatSvc: ChatService) {}
    
  ngOnInit(): void {
    this.chatSvc.subscribeToRoom('bob');
  }

  send(text: string) {
    // publish to USERNAME, MESSAGE, MESSAGETYPE
    // this.msgSvc.publish('bob', text, MessageType.CHAT)
    this.chatSvc.sendMessage('bob', text);
  }
}
