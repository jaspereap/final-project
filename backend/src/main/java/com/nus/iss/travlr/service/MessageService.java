package com.nus.iss.travlr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.MessageType;

@Service
public class MessageService {
    @Autowired private WebSocketService webSocketService;

    public void publishToRoom(String roomId, String data, MessageType type) {
        webSocketService.publishToTopic(roomId, data, type);
    }

    public void publishToUser(String roomId, String playerName, String data, MessageType type) {
        webSocketService.publishToTopic("%s/%s".formatted(roomId, playerName), data, type);
    }

}
