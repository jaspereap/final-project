package com.nus.iss.travlr.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.Day;
import com.nus.iss.travlr.models.Place;
import com.nus.iss.travlr.models.Trip;
import com.nus.iss.travlr.models.DTO.Request.PlaceRequest;
import com.nus.iss.travlr.repository.TripRepository;

@Service
public class ItineraryService {
    @Autowired private TripRepository tripRepo;
    
    public Trip addPlaceToItineraryDay(String tripId, String targetDate, PlaceRequest place) {
        Place newPlace = new Place(place.getName(), place.getAddress(), place.getLatlng());

        // Find the trip by ID
        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + tripId));

        // Find the specific Day within the Itinerary
        Day targetDay = trip.getItinerary().getDays().stream()
                .filter(day -> Long.toString(day.getDate().getTime()).equals(targetDate))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Day not found in itinerary"));

        // Add the new place to the day's activities
        targetDay.addPlace(newPlace);

        // Save the updated trip back to MongoDB
        return tripRepo.save(trip);
    }
}
