package com.nus.iss.travlr.models.DTO.Request;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlaceRequest {
    String name;
    String address;
    Float[] latlng;
    String image;
}
