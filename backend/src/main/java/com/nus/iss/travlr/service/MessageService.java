package com.nus.iss.travlr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.DTO.MessageType;

@Service
public class MessageService {
    @Autowired private WebSocketService webSocketService;

    public void publishToUser(String userId, String data, MessageType type) {
        webSocketService.publishToTopic("user/" + userId, data, type);
    }
    public void publishToTrip(String tripId, String data, MessageType type) {
        webSocketService.publishToTopic("trip/" + tripId, data, type);
    }

    // public void publishToRoom(String roomId, String playerName, String data, MessageType type) {
    //     webSocketService.publishToTopic("%s/%s".formatted(roomId, playerName), data, type);
    // }

}
