package com.nus.iss.travlr.models;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Itinerary {
    String id;
    Long ownerId; // UserEntity Id
    Set<Long> tripMatesId = new HashSet<>(); // UserEntity Id
    List<Day> days;
}

// Itinerary =
// {
//   id: 1,
//   days: [{day}]
// }