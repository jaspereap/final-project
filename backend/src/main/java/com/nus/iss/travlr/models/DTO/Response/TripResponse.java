package com.nus.iss.travlr.models.DTO.Response;

import java.util.Date;

import com.nus.iss.travlr.models.Trip;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.Data;

@Data
public class TripResponse {
    String id;
    String country;
    Date startDate;
    Date endDate;
    Long ownerId;
    String image;

    public TripResponse(Trip trip) {
        this.id = trip.getId();
        this.country = trip.getCountry();
        this.startDate = trip.getStartDate();
        this.endDate = trip.getEndDate();
        this.ownerId = trip.getOwnerId();
        this.image = trip.getImage();
    }
    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("id", id)
            .add("country", country)
            .add("startDate", startDate.getTime())
            .add("endDate", endDate.getTime())
            .add("ownerId", ownerId)
            .add("image", image)
            .build();
    }
}