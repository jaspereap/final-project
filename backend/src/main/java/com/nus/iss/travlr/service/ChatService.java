package com.nus.iss.travlr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nus.iss.travlr.models.Chat.ChatMessage;
import com.nus.iss.travlr.repository.ChatRepository;

@Service
public class ChatService {
    @Autowired private ChatRepository chatRepo;

    @Transactional
    public void addMessageToTrip(ChatMessage message) {
        chatRepo.save(message);
    }

    public List<ChatMessage> getMessageFromTrip(String tripId) {
        return chatRepo.findAllByTripId(tripId);
    }
}
