package com.nus.iss.travlr.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.Costing;
import com.nus.iss.travlr.models.Day;
import com.nus.iss.travlr.models.Itinerary;
import com.nus.iss.travlr.models.Place;
import com.nus.iss.travlr.models.Trip;
import com.nus.iss.travlr.models.DTO.Request.NewPlaceRequest;
import com.nus.iss.travlr.repository.TripRepository;

@Service
public class ItineraryService {
    @Autowired private TripRepository tripRepo;
    @Autowired private MongoTemplate mt;

    public Itinerary getItineraryByTripId(String tripId) {
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        Trip trip = optTrip.get();
        // System.out.println(trip);
        return trip.getItinerary();
    }
    // Updates Place
    public Itinerary updatePlaceInItineraryDay(String tripId, String date, String rank, Place place) {
        // Json.createReader(new StringReader(place)).readObject()
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        if (optTrip.isEmpty()) {
            return null;
        }
        Trip trip = optTrip.get();
        trip.getItinerary().getDays().forEach(day -> {
            if (day.getDate().getTime() == Long.parseLong(date)) {
                Place selectedPlace = day.getPlaces().get(Integer.parseInt(rank) - 1);
                selectedPlace.setName(place.getName());
                selectedPlace.setAddress(place.getAddress());
                selectedPlace.setCostings(place.getCostings());
                selectedPlace.setStart(place.getStart());
                selectedPlace.setEnd(place.getEnd());
                selectedPlace.setImage(place.getImage());
                selectedPlace.setNotes(place.getNotes());
                selectedPlace.setLatlng(place.getLatlng());
            }
        });
        
        return tripRepo.save(trip).getItinerary();
    }

    public Itinerary addPlaceToItineraryDay(String tripId, String targetDate, NewPlaceRequest place) {
        Place newPlace = new Place(place.getName(), place.getAddress(), place.getLatlng(), place.getImage());
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
        return tripRepo.save(trip).getItinerary();
    }

    public Itinerary deleteItineraryPlace(String tripId, String targetDate, String rank) {
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        if (optTrip.isEmpty()) {
            return null;
        }
        Trip trip = optTrip.get();
        for (Day day : trip.getItinerary().getDays()) {
            if (day.getDate().getTime() == Long.parseLong(targetDate)) {
                day.getPlaces().remove(Integer.parseInt(rank));
            }
        }
        return tripRepo.save(trip).getItinerary();
    }

    public Itinerary addCostingToItineraryPlace(String tripId, String targetDate, String rank, Costing costing) {
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        if (optTrip.isEmpty()) {
            return null;
        }
        Trip trip = optTrip.get();
        for (Day day : trip.getItinerary().getDays()) {
            if (day.getDate().getTime() == Long.parseLong(targetDate)) {
                day.getPlaces().get(Integer.parseInt(rank)).getCostings().add(costing);
            }
        }
        return tripRepo.save(trip).getItinerary();
    }
    public Itinerary deleteCosting(String tripId, String targetDate, String rank, String costingIndex) {
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        if (optTrip.isEmpty()) {
            return null;
        }
        Trip trip = optTrip.get();
        for (Day day : trip.getItinerary().getDays()) {
            if (day.getDate().getTime() == Long.parseLong(targetDate)) {
                day.getPlaces().get(Integer.parseInt(rank)).getCostings().remove(Integer.parseInt(costingIndex));
            }
        }
        return tripRepo.save(trip).getItinerary();
    }
}
