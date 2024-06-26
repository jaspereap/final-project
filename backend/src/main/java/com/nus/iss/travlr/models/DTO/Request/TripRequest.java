package com.nus.iss.travlr.models.DTO.Request;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.nus.iss.travlr.models.DTO.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripRequest {
    IdentityToken identity;
    String country;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    Date start;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    Date end;
    List<UserDTO> tripMates;
}
