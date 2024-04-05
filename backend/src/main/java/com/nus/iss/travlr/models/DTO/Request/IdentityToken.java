package com.nus.iss.travlr.models.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IdentityToken {
    String username;
    Long userId;

    public IdentityToken(String username, String userId) {
        this.username = username;
        this.userId = Long.parseLong(userId);
    }
    public IdentityToken(String username, int userId) {
        this.username = username;
        this.userId = Long.valueOf(userId);
    }
}
