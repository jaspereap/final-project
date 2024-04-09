package com.nus.iss.travlr.models.DTO.Response;

import java.util.Date;
import java.util.Set;

import com.nus.iss.travlr.models.Trip;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
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
    Set<Long> tripMatesId;

    public TripResponse(Trip trip) {
        this.id = trip.getId();
        this.country = trip.getCountry();
        this.startDate = trip.getStartDate();
        this.endDate = trip.getEndDate();
        this.ownerId = trip.getOwnerId();
        this.image = trip.getImage();
        this.tripMatesId = trip.getTripMatesId();
    }
    public JsonObject toJson() {
        JsonArrayBuilder tripMatesIdArr = Json.createArrayBuilder();
        for (Long id : tripMatesId) {
            tripMatesIdArr.add(id);
        }
        return Json.createObjectBuilder()
            .add("id", id)
            .add("country", country)
            .add("startDate", startDate.getTime())
            .add("endDate", endDate.getTime())
            .add("ownerId", ownerId)
            .add("image", image)
            .add("tripMatesId", tripMatesIdArr)
            .build();
    }
}