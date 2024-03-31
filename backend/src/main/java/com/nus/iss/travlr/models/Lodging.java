package com.nus.iss.travlr.models;

import java.util.ArrayList;
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
public class Lodging {
    String name;
    String notes;
    Date checkIn;
    Date checkOut;
    List<Costing> costings = new ArrayList<>();

    // Location
    String address;
    Float[] latlng;

    public JsonObject toJson() {
        JsonArrayBuilder costingsArr = Json.createArrayBuilder();
        for (Costing costing : costings) {
            costingsArr.add(costing.toJson());
        }
        return Json.createObjectBuilder()
            .add("name", name)
            .add("notes", notes)
            .add("checkIn", checkIn.getTime())
            .add("checkOut", checkOut.getTime())
            .add("costings", costingsArr)
            .add("address", address)
            .add("latlng", Json.createArrayBuilder().add(latlng[0]).add(latlng[1]))
            .build();
    }
}