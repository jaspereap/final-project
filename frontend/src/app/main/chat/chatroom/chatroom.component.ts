import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ChatService } from '../chat.service';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from '../../../models/dtos';
import { ChatMessage } from '../models/ChatMessage';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss'
})
export class ChatroomComponent implements OnInit {
  currentUser!: UserDTO;
  tripId!: string;
  chatHistory: ChatMessage[] = [];
  messageText: string = '';
  @Input() showChat: boolean = false;
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  constructor(
    private localStore: LocalStorageService,
    private chatSvc: ChatService,
    private route: ActivatedRoute,) {}
  
  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];
    this.currentUser = this.localStore.getUser();
    this.chatSvc.subscribeToTripChat(this.tripId);
    this.loadChatHistory();
    this.chatSvc.newMessage.subscribe(
      (chatMessage) => {
        this.chatHistory.push(chatMessage);
      }
    )
  }

  loadChatHistory() {
    this.chatSvc.getHistory(this.tripId).subscribe(
      (messages) => {
        this.chatHistory = messages;
        console.log('chat history loaded')
      }
    );
  }

  sendMessage() {
    if (this.messageText.length !== 0) {
      this.chatSvc.sendMessage(this.tripId, this.currentUser, this.messageText);
    }
    this.messageText = '';
  }

}
