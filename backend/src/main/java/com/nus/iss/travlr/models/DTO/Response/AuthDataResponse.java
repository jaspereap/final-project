package com.nus.iss.travlr.models.DTO.Response;

import com.nus.iss.travlr.models.DTO.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthDataResponse {
    String authToken;
    UserDTO user;
}
