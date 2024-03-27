package com.nus.iss.travlr.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceDTO {
    // TODO: placeDTO
    private Integer rank;
    private String name;
    private String image;
    private String notes;
    // Consider including start and end times if applicable
    private String address;
    private String[] latlng; // Consider using a more structured type for latitude and longitude


}
