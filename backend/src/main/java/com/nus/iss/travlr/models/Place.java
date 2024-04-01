package com.nus.iss.travlr.models;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
public class Place {
    @Id
    Integer rank;
    String name = "";
    String image = "";
    String notes = "";
    Date start;
    Date end;
    List<Costing> costings = new ArrayList<>();
    // Location
    String address = "";
    Float[] latlng = new Float[]{0f, 0f};

    public JsonObject toJson() {
        JsonArrayBuilder costingsArr = Json.createArrayBuilder();
        for (Costing costing : costings) {
            costingsArr.add(costing.toJson());
        }

        return Json.createObjectBuilder()
            .add("rank", rank)
            .add("name", name)
            .add("image", image)
            .add("notes", notes)
            .add("start", start != null ? start.getTime() : 0)
            .add("end", end != null ? end.getTime() : 0)
            .add("costings", costingsArr)
            .add("address", address)
            .add("latlng", Json.createArrayBuilder().add(latlng[0]).add(latlng[1]))
            .build();
    }
}