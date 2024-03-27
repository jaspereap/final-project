package com.nus.iss.travlr.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthData {
    String authToken;
    UserDTO user;
}
