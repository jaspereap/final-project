package com.nus.iss.travlr.models;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Day {
    Date date;
    List<Lodging> lodgings;
    List<Place> activities;
}

// {
//     date: '',
//     lodging: [{Lodging}],
//     activities: [{Place}]
// }