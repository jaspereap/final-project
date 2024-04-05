package com.nus.iss.travlr.models.DTO;

import com.nus.iss.travlr.models.User.UserEntity;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    Long userId;
    String username;
    String firstName;
    String lastName;
    String email;

    public UserDTO(UserEntity user) {
        this.userId = user.getId();
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("userId", userId != null ? userId.toString() : "")
            .add("username", username != null ? username : "")
            .add("email", email != null ? email : "")
            .add("firstName", firstName != null ? firstName : "")
            .add("lastName", lastName != null ? lastName : "")
            .build();
    } 
}
