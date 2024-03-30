package com.nus.iss.travlr.models;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Day {
    Date date;
    // List<Lodging> lodgings;
    List<Place> places;
}

// {
//     date: '',
//     lodging: [{Lodging}],
//     activities: [{Place}]
// }