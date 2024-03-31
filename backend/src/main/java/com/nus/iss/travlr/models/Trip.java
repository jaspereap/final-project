package com.nus.iss.travlr.models;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
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
    List<Lodging> lodgings;
    Itinerary itinerary;
    // New addition
    String image;

    // TODO: Complete toJson
    public JsonObject toJson() {
        JsonArrayBuilder tripMatesIdArr = Json.createArrayBuilder();
        JsonArrayBuilder flightDetailsArr = Json.createArrayBuilder();
        JsonArrayBuilder lodgingsArr = Json.createArrayBuilder();
        for (Long id : tripMatesId) {
            tripMatesIdArr.add(id);
        }
        for (Flight detail: flightDetails) {
            flightDetailsArr.add(detail.toJson());
        }
        for (Lodging lodging : lodgings) {
            lodgingsArr.add(lodging.toJson());
        }
        return Json.createObjectBuilder()
            .add("id", id)
            .add("country", country)
            .add("startDate", startDate.getTime())
            .add("endDate", endDate.getTime())
            .add("ownerId", ownerId)
            .add("tripMatesId", tripMatesIdArr)
            .add("flightDetails", flightDetailsArr)
            .add("lodgings", lodgingsArr)
            .add("itinerary", itinerary.toJson())
            .add("image", image)
            .build();
    }
}
