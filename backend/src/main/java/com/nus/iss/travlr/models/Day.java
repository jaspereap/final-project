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
public class Day {
    Date date;
    List<Place> places;

    public JsonObject toJson() {
        JsonArrayBuilder placesArr = Json.createArrayBuilder();
        if (places != null) {
            for (Place place : places) {
                placesArr.add(place.toJson());
            }
        }
        return Json.createObjectBuilder()
            .add("date", date != null ? date.getTime() : 0)
            .add("places", placesArr)
            .build();
    }

    public void addPlace(Place place) {
        Integer nextRank = places.getLast().getRank() + 1;
        place.setRank(nextRank);
        places.add(place);
    }
}

// {
//     date: '',
//     lodging: [{Lodging}],
//     activities: [{Place}]
// }