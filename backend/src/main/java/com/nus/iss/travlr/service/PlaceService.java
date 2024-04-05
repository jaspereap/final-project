package com.nus.iss.travlr.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.Day;
import com.nus.iss.travlr.models.Itinerary;
import com.nus.iss.travlr.models.Place;
import com.nus.iss.travlr.models.Trip;
import com.nus.iss.travlr.models.DTO.Request.NewPlaceRequest;
import com.nus.iss.travlr.repository.TripRepository;

@Service
public class PlaceService {
    @Autowired private TripRepository tripRepo;

    // public Itinerary addPlaceToDate(String tripId, String date, PlaceRequest place) {
    //     Optional<Trip> optTrip = tripRepo.findById(tripId);
    //     Trip trip = optTrip.get();
    //     Place newPlace = new Place(place.getName(), place.getAddress(), place.getLatlng());
    //     System.out.println("Search for date: " + date);
    //     for (Day day: trip.getItinerary().getDays()) {
    //         if (Long.toString(day.getDate().getTime()).equals(date)) {
    //             System.out.println("MATCH FOUND!!!! Match date: " + day.getDate().getTime());
    //             day.addPlace(newPlace);
    //             break;
    //         }
    //     }
    //     tripRepo.save(trip);
    //     return trip.getItinerary();
    // }
}
