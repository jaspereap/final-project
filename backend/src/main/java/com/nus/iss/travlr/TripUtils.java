package com.nus.iss.travlr;

import java.util.List;

import com.nus.iss.travlr.models.Trip;
import com.nus.iss.travlr.models.DTO.TripCard;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;

public class TripUtils {
    public static JsonArray tripToTripCards(List<Trip> trips) {
        JsonArrayBuilder tripCardArr = Json.createArrayBuilder();
        for (Trip trip : trips) {
            TripCard tripCard = new TripCard(trip);
            tripCardArr.add(tripCard.toJson());
        }
        return tripCardArr.build();
    }
}
