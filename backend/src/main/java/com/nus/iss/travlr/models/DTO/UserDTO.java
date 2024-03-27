package com.nus.iss.travlr.models.DTO;

import com.nus.iss.travlr.models.User.UserEntity;

import lombok.Data;

@Data
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
}
