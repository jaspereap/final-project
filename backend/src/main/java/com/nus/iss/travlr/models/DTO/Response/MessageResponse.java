package com.nus.iss.travlr.models.DTO.Response;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MessageResponse {
    JsonObject message;
    public MessageResponse(String msg) {
        this.message = Json.createObjectBuilder().add("message", msg).build();
    }
    public String get() {
        return message.toString();
    }
}
