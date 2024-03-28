package com.nus.iss.travlr.models.DTO.Request;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripRequest {
    String country;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    Date start;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    Date end;
}
