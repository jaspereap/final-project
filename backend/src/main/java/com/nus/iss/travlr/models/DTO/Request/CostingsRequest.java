package com.nus.iss.travlr.models.DTO.Request;

import com.nus.iss.travlr.models.Costing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CostingsRequest {
    IdentityToken identity;
    String payer;
    Float cost;
    String currency;
    public Costing toCosting() {
        return new Costing(payer, cost, currency);
    }
}
