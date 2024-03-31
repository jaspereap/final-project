package com.nus.iss.travlr.models;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Costing {
    String payer;
    Float cost;
    String currency;
    public Costing(Float cost, String currency) {
        payer = "";
        this.cost = cost;
        this.currency = currency;
    }
    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("payer", payer)
            .add("cost", cost)
            .add("currency", currency)
            .build();
    }
}
