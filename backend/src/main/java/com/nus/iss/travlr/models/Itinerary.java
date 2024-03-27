package com.nus.iss.travlr.models;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Itinerary {
    String id;
    List<Day> days;
}

// Itinerary =
// {
//   id: 1,
//   days: [{day}]
// }