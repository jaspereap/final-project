package com.nus.iss.travlr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.nus.iss.travlr.models.MessageType;
import com.nus.iss.travlr.service.MessageService;

@RestController
@CrossOrigin(origins = "*")
public class ChatController {
    @Autowired
    MessageService msgSvc;

    @MessageMapping("/chat/{roomId}")
    public void userToUserMessage(@DestinationVariable String roomId, 
        @Payload String body, 
        SimpMessageHeaderAccessor header) {
        System.out.printf("\tInbound Message: %s\n\troomId: %s", body, roomId );
        System.out.println("\tInbound Headers: " + header.getFirstNativeHeader("type"));
        String type = header.getFirstNativeHeader("type");
        msgSvc.publishToRoom(roomId, body, MessageType.CHAT);
    }
}
