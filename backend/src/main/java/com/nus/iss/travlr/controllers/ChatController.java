package com.nus.iss.travlr.controllers;

import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nus.iss.travlr.models.MessageType;
import com.nus.iss.travlr.models.Chat.ChatMessage;
import com.nus.iss.travlr.models.DTO.Response.MessageResponse;
import com.nus.iss.travlr.models.User.UserEntity;
import com.nus.iss.travlr.repository.UserRepository;
import com.nus.iss.travlr.service.ChatService;
import com.nus.iss.travlr.service.MessageService;
import com.nus.iss.travlr.utils.ChatUtils;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/v1/chat")
public class ChatController {
    @Autowired private MessageService msgSvc;
    @Autowired private ChatService chatSvc;
    @Autowired private UserRepository userRepo;

    @GetMapping(path = "/history/{tripId}")
    public ResponseEntity<String> getMessageHistory(@PathVariable String tripId) {
        List<ChatMessage> messages = chatSvc.getMessageFromTrip(tripId);
        System.out.println(messages);
        // return ResponseEntity.ok(new MessageResponse("ok").get());
        JsonArrayBuilder messageArr = Json.createArrayBuilder();
        for (ChatMessage message : messages) {
            messageArr.add(message.toJson());
        }
        return ResponseEntity.ok(messageArr.build().toString());
    }

    @MessageMapping("/chat/{tripId}")
    public void userToTrip(@DestinationVariable String tripId, 
        @Payload String body, 
        SimpMessageHeaderAccessor header) {
        System.out.printf("\tInbound Message: %s\n\troomId: %s", body, tripId );
        System.out.println("\tInbound Headers: " + header.getFirstNativeHeader("type"));
        String type = header.getFirstNativeHeader("type");
        if (type.equals(MessageType.CHAT.toString())) {
            this.msgSvc.publishToTrip(tripId, body, MessageType.CHAT);

            JsonObject messageObject = Json.createReader(new StringReader(body)).readObject();
            JsonObject senderObject = messageObject.getJsonObject("sender");
            Long userId = senderObject.getJsonNumber("userId").longValue();
            UserEntity user = userRepo.findById(userId).get();

            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setMessage(messageObject.getString("message"));
            chatMessage.setTripId(messageObject.getString("destination"));
            chatMessage.setSender(user);
            System.out.println(chatMessage);
            chatSvc.addMessageToTrip(chatMessage);
        }
    }
}
