package com.nus.iss.travlr.models;
import java.sql.Time;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Place {
    @Id
    Integer rank;
    String name;
    String image;
    String notes;
    Date start;
    Date end;
    // Location
    String address;
    String[] latlng;
}