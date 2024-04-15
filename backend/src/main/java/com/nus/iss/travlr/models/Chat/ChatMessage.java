package com.nus.iss.travlr.models.Chat;

import com.nus.iss.travlr.models.DTO.UserDTO;
import com.nus.iss.travlr.models.User.UserEntity;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "chat")
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    String message;
    String tripId;
    
    // Foreign Key: UserEntity id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private UserEntity sender;

    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("message", message)
            .add("destination", tripId)
            .add("sender", new UserDTO(sender).toJson())
            .build();
    }
}
