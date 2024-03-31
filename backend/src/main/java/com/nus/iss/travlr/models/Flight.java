package com.nus.iss.travlr.models;

import java.util.Date;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
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
    List<Costing> costings;
    // Float cost;
    // String currency;

    public JsonObject toJson() {
        JsonArrayBuilder costingsArr = Json.createArrayBuilder();
        for (Costing costing : costings) {
            costingsArr.add(costing.toJson());
        }
        return Json.createObjectBuilder()
            .add("airlineName", airlineName)
            .add("flightNumber", flightNumber)
            .add("departureCountry", departureCountry)
            .add("arrivalCountry", arrivalCountry)
            .add("departureDate", departureDate.getTime())
            .add("arrivalDate", arrivalDate.getTime())
            .add("notes", notes)
            .add("image", image)
            .add("costings", costingsArr)
            .build();
    }
}
