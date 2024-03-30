package com.nus.iss.travlr.models;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lodging {
    String name;
    Float cost;
    String currency;
    String notes;
    Date checkIn;
    Date checkOut;
    // Location
    String address;
    String[] latlng;
}