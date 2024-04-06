package com.nus.iss.travlr.models.DTO.Request;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.nus.iss.travlr.models.Costing;
import com.nus.iss.travlr.models.Lodging;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LodgingRequest {
    IdentityToken identity;

    String name = "";
    String notes = "";
    Date checkIn;
    Date checkOut;
    List<Costing> costings = new ArrayList<>();

    // Location
    String address = "";
    Float[] latlng = new Float[]{0f, 0f};

    public Lodging toLodging() {
        return new Lodging(name, notes, checkIn, checkOut, costings, address, latlng);
    }

    public JsonObject toJson() {
        JsonArrayBuilder costingsArr = Json.createArrayBuilder();
        if (costings != null && !costings.isEmpty()) {
            for (Costing costing : costings) {
                costingsArr.add(costing.toJson());
            }
        }
        return Json.createObjectBuilder()
            .add("name", name != null ? name : "")
            .add("notes", notes != null ? notes : "")
            .add("checkIn", checkIn != null ? checkIn.getTime() : 0)
            .add("checkOut", checkOut != null ? checkOut.getTime() : 0)
            .add("costings", costingsArr)
            .add("address", address != null ? address : "")
            .add("latlng", latlng[0] != null ? Json.createArrayBuilder().add(latlng[0]).add(latlng[1]) : Json.createArrayBuilder().add(0).add(0))
            .build();
    }
}
