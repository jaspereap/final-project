package com.nus.iss.travlr.models;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Lodging {
    String name;
    Float cost;
    String notes;
    Date checkIn;
    Date checkOut;
}