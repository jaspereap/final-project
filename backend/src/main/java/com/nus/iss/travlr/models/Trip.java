package com.nus.iss.travlr.models;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Trip {
    @Id
    String id;
    String country;
    Date startDate;
    Date endDate;
    Long ownerId;
    Set<Long> tripMatesId = new HashSet<>();
    List<Flight> flightDetails;
    Itinerary itinerary;
}
