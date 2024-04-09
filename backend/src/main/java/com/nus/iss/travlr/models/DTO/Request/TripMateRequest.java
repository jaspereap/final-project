package com.nus.iss.travlr.models.DTO.Request;

import com.nus.iss.travlr.models.DTO.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripMateRequest {
    IdentityToken identity;
    String username;
}
