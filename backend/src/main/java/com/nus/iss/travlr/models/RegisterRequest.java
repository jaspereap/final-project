package com.nus.iss.travlr.models;

import lombok.Data;

@Data
public class RegisterRequest {
    String username;
    String email;
    String password;
}
