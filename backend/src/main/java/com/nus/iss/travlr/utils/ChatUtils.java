package com.nus.iss.travlr.utils;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;

import com.nus.iss.travlr.models.Chat.ChatMessage;
import com.nus.iss.travlr.models.User.UserEntity;
import com.nus.iss.travlr.repository.UserRepository;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class ChatUtils {

    public static ChatMessage toChatMessage(String message) {
        System.out.println("MEssage in utisl: " + message);
        JsonObject messageObject = Json.createReader(new StringReader(message)).readObject();
        JsonObject senderObject = messageObject.getJsonObject("sender");


        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setMessage(messageObject.getString("message"));
        chatMessage.setTripId(messageObject.getString("destination"));
        // chatMessage.setSenderId(senderObject.getJsonNumber("userId").longValue());
        // chatMessage.setSenderUsername(senderObject.getString("username"));
        return chatMessage;
    }
}
