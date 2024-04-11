package com.nus.iss.travlr.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.MessageType;

@Service
public class WebSocketService {
    @Autowired private SimpMessagingTemplate msgTemplate;
    
    final String PREFIX_TOPIC = "/topic/";

    public void publishToTopic(String topic, String data, MessageType type) {
        String destination = PREFIX_TOPIC + topic;
        System.out.println("\tOutbound Destination: " + destination);
        System.out.println("\tOutbound data: " + data);
        // Set header
        SimpMessageHeaderAccessor header = SimpMessageHeaderAccessor.create();
        header.setNativeHeader("type", type.toString());
        header.setLeaveMutable(true);
        System.out.println("\tOutbound Header: " + header.toNativeHeaderMap());
        msgTemplate.convertAndSend(destination, data, header.getMessageHeaders());
    }
    
    public void publishToTopicWithCustomHeaders(String topic, String data, Map<String, String> customHeaders) {
        String destination = PREFIX_TOPIC + topic;
        System.out.println("\tOutbound Destination: " + destination);
        System.out.println("\tOutbound data: " + data);
        
        // Set headers from the provided map
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create();
        for (Map.Entry<String, String> entry : customHeaders.entrySet()) {
            headerAccessor.setNativeHeader(entry.getKey(), entry.getValue());
        }
        headerAccessor.setLeaveMutable(true);

        System.out.println("\tOutbound Headers: " + headerAccessor.toNativeHeaderMap());
        
        // Send the message
        msgTemplate.convertAndSend(destination, data, headerAccessor.getMessageHeaders());
    }

}