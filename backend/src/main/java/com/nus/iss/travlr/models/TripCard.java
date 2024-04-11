package com.nus.iss.travlr.models;

import java.util.Date;
import java.util.Set;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripCard {
    String id;
    Long ownerId;
    Set<Long> tripMatesId;
    String country;
    Date startDate;
    Date endDate;
    String image;

    public TripCard(Trip trip) {
        this.id = trip.getId();
        this.ownerId = trip.getOwnerId();
        this.tripMatesId = trip.getTripMatesId();
        this.country = trip.getCountry();
        this.startDate = trip.getStartDate();
        this.endDate = trip.getEndDate();
        this.image = trip.getImage();
    }

    public JsonObject toJson() {
        JsonArrayBuilder tripMatesIdArr = Json.createArrayBuilder();

        for (Long id : tripMatesId) {
            tripMatesIdArr.add(id);
        }
        
        return Json.createObjectBuilder()
            .add("id", id)
            .add("ownerId", ownerId)
            .add("tripMatesId", tripMatesIdArr)
            .add("country", country)
            .add("startDate", startDate.getTime())
            .add("endDate", endDate.getTime())
            .add("image", image)
            .build();
    }
}
