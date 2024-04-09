package com.nus.iss.travlr.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceDTO {
    private Integer rank;
    private String name;
    private String image;
    private String notes;
    private String address;
    private String[] latlng;


}
