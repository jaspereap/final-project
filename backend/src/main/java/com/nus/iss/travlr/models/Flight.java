package com.nus.iss.travlr.models;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Flight {
    String airlineName;
    String flightNumber;
    String departureCountry;
    String arrivalCountry;
    Date departureDate;
    Date arrivalDate;
    String notes;
    String image;
    Float cost;
}
