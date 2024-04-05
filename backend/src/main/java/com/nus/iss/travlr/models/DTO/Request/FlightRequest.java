package com.nus.iss.travlr.models.DTO.Request;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.nus.iss.travlr.models.Costing;
import com.nus.iss.travlr.models.Flight;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightRequest {
    IdentityToken identity;

    String airlineName = "";
    String flightNumber = "";
    String departureCountry = "";
    String arrivalCountry = "";
    Date departureDate;
    Date arrivalDate;
    String notes = "";
    String image = "";
    List<Costing> costings = new ArrayList<>();
    public Flight toFlight() {
        return new Flight(airlineName, flightNumber, departureCountry, arrivalCountry, departureDate, arrivalDate, notes, image, costings);
    }
    public JsonObject toJson() {
        JsonArrayBuilder costingsArr = Json.createArrayBuilder();
        if (costings != null && !costings.isEmpty()) {
            for (Costing costing : costings) {
                if (costing != null) {
                    costingsArr.add(costing.toJson());
                }
            }
        }
        return Json.createObjectBuilder()
            .add("airlineName", airlineName)
            .add("flightNumber", flightNumber)
            .add("departureCountry", departureCountry)
            .add("arrivalCountry", arrivalCountry)
            .add("departureDate", departureDate != null ? departureDate.getTime() : 0)
            .add("arrivalDate", arrivalDate != null ? arrivalDate.getTime() : 0)
            .add("notes", notes)
            .add("image", image)
            .add("costings", costingsArr)
            .build();
    }
}
