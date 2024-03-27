package com.nus.iss.travlr.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthData {
    String authToken;
    UserDTO user;
}
