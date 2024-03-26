package com.nus.iss.travlr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.nus.iss.travlr.models.MessageType;
import com.nus.iss.travlr.service.MessageService;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping(path = "/test")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class TestController {
    @Autowired MessageService msgSvc;

    @GetMapping(path = "/")
    public ResponseEntity<String> test(Authentication auth) {
        System.out.println("\t Test Controller Triggered");
        String currentUserName = auth.getName(); // Get username from JWT
        JsonObject response = Json.createObjectBuilder().add("message", "Request was successful! Authenticated user: %s".formatted(currentUserName)).build();
        return ResponseEntity.ok(response.toString());
    }

    @GetMapping(path = "/pubtoroom/{room}")
    public void pubToRoom(@PathVariable String room) {
        msgSvc.publishToRoom(room, "Test pub to game", MessageType.ACK);
    }

    @MessageMapping("/{gameId}/{playerName}/ack")
    public void playerAck(@DestinationVariable String gameId, 
        @DestinationVariable String playerName, 
        @Payload String body, 
        SimpMessageHeaderAccessor header) {
        System.out.printf("\tInbound Ack: \n\tgameId: %s \n\tplayerName: %s \n\tBody: %s\n", gameId, playerName, body);
        System.out.println("\tInbound Headers: " + header.getFirstNativeHeader("type"));
        String type = header.getFirstNativeHeader("type");
    }
}
