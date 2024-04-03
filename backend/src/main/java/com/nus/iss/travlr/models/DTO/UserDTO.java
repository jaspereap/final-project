package com.nus.iss.travlr.models.DTO;

import com.nus.iss.travlr.models.User.UserEntity;

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
}
