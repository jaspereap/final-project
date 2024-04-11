package com.nus.iss.travlr.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.MessageType;

@Service
public class MessageService {
    @Autowired private WebSocketService webSocketService;

    public void publishToUser(String userId, String data, MessageType type) {
        webSocketService.publishToTopic("user/" + userId, data, type);
    }
    public void publishToTrip(String tripId, String data, MessageType type) {
        webSocketService.publishToTopic("trip/" + tripId, data, type);
    }

    public void publishToTripWithAuthor(String tripId, String data, MessageType type, String author) {
        Map<String, String> headers = new HashMap<>();
        headers.put("type", type.toString());
        headers.put("author", author);
        webSocketService.publishToTopicWithCustomHeaders("trip/" + tripId, data, headers);
    }

}
