import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ChatService } from '../chat.service';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from '../../../models/dtos';
import { ChatMessage } from '../models/ChatMessage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss'
})
export class ChatroomComponent implements OnInit, OnDestroy{
  currentUser!: UserDTO;
  tripId!: string;
  chatHistory: ChatMessage[] = [];
  messageText: string = '';
  @Input() showChat: boolean = false;
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  // Subscription Management
  newMessageSub?: Subscription;
  chatSub?: Subscription;

  constructor(
    private localStore: LocalStorageService,
    private chatSvc: ChatService,
    private route: ActivatedRoute,) {}

  ngOnDestroy(): void {
    this.newMessageSub?.unsubscribe();
    this.chatSub?.unsubscribe();
  }
  
  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['tripId'];
    this.currentUser = this.localStore.getUser();
    this.chatSub = this.chatSvc.subscribeToTripChat(this.tripId);
    this.loadChatHistory();

    this.newMessageSub = this.chatSvc.newMessage.subscribe(
      (chatMessage) => {
        this.chatHistory.push(chatMessage);
      }
    )
  }

  loadChatHistory() {
    this.chatSvc.getHistory(this.tripId).subscribe(
      (messages) => {
        this.chatHistory = messages;
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
