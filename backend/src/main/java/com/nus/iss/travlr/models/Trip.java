package com.nus.iss.travlr.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

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
    String country = "";
    Date startDate;
    Date endDate;
    Long ownerId;
    Set<Long> tripMatesId = new HashSet<>();
    List<Flight> flightDetails = new ArrayList<>();
    List<Lodging> lodgings = new ArrayList<>();
    Itinerary itinerary = new Itinerary();
    String image = "";

    public Trip(Long ownerId, String country, Date startDate, Date endDate ) {
        this.id = UUID.randomUUID().toString().substring(0, 8);
        this.ownerId = ownerId;
        this.country = country;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public JsonObject toJson() {
        JsonArrayBuilder tripMatesIdArr = Json.createArrayBuilder();
        JsonArrayBuilder flightDetailsArr = Json.createArrayBuilder();
        JsonArrayBuilder lodgingsArr = Json.createArrayBuilder();
        for (Long id : tripMatesId) {
            tripMatesIdArr.add(id);
        }
        if (flightDetails != null) {
            for (Flight flight : flightDetails) {
                if (flight != null) {
                    flightDetailsArr.add(flight.toJson());
                }
            }
        }
        if (lodgings != null) {
            for (Lodging lodging : lodgings) {
                lodgingsArr.add(lodging.toJson());
            }
        }
        
        return Json.createObjectBuilder()
            .add("id", id)
            .add("country", country)
            .add("startDate", startDate != null ? startDate.getTime() : 0)
            .add("endDate", endDate != null ? endDate.getTime() : 0)
            .add("ownerId", ownerId)
            .add("tripMatesId", tripMatesIdArr)
            .add("flightDetails", flightDetailsArr)
            .add("lodgings", lodgingsArr)
            .add("itinerary", itinerary.toJson())
            .add("image", image)
            .build();
    }
}
