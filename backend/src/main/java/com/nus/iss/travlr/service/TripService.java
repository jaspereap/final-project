package com.nus.iss.travlr.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.Flight;
import com.nus.iss.travlr.models.Trip;
import com.nus.iss.travlr.repository.TripRepository;

@Service
public class TripService {
    @Autowired private TripRepository tripRepo;

    // Get trip
    public Optional<Trip> getTrip(String tripId) {
        return tripRepo.findById(tripId);
    }
    
    // Get all trips
    public ArrayList<Trip> getAllTripsByUserId(Long userId) {
        List<Trip> ownerTrips = tripRepo.findByOwnerId(userId);
        List<Trip> mateTrips = tripRepo.findByTripMatesIdContains(userId);
        Set<Trip> combinedTrips = new HashSet<>(ownerTrips);
        combinedTrips.addAll(mateTrips);
        return new ArrayList<>(combinedTrips);
    }

    public Trip createTrip(Trip trip) throws IllegalArgumentException {
        // Validate and process trip details
        // For example, setting trip mates, flights, and itinerary
        return tripRepo.save(trip);
    }

    public Trip addTripMate(String tripId, Long newTripMateId) {
        // Find the trip by ID
        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + tripId));

        // Add the new trip mate's ID to the set
        trip.getTripMatesId().add(newTripMateId);

        // Save the updated trip back to MongoDB
        return tripRepo.save(trip);
    }

    public Trip addFlightToTrip(String tripId, Flight flight) {
        // Find the trip by ID
        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + tripId));

        // Add the new trip mate's ID to the set
        trip.getFlightDetails().add(flight);

        // Save the updated trip back to MongoDB
        return tripRepo.save(trip);
    }
}
