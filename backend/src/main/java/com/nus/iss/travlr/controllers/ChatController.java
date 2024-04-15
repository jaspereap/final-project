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

    @MessageMapping("/chat/{tripId}")
    public void userToTrip(@DestinationVariable String tripId, 
        @Payload String body, 
        SimpMessageHeaderAccessor header) {
        System.out.printf("\tInbound Message: %s\n\troomId: %s", body, tripId );
        System.out.println("\tInbound Headers: " + header.getFirstNativeHeader("type"));
        String type = header.getFirstNativeHeader("type");
        if (type.equals(MessageType.CHAT.toString())) {
            this.msgSvc.publishToTrip(tripId, body, MessageType.CHAT);
        }
    }
}
