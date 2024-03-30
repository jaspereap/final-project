package com.nus.iss.travlr.models.DTO;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripCard {
    String id;
    Long ownerId;
    String country;
    Date startDate;
    Date endDate;
    String image;
}
