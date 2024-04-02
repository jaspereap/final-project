package com.nus.iss.travlr.models;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Itinerary {
    String id = UUID.randomUUID().toString().substring(0,4);
    List<Day> days = new ArrayList<>();

    public JsonObject toJson() {
        JsonArrayBuilder daysArr = Json.createArrayBuilder();
        if (days != null) {
            for (Day day : days) {
                daysArr.add(day.toJson());
            }
        }
        return Json.createObjectBuilder()
            .add("id", id)
            .add("days", daysArr)
            .build();
    }
}

// Itinerary =
// {
//   id: 1,
//   days: [{day}]
// }