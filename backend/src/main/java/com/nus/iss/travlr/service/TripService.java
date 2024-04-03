package com.nus.iss.travlr.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.Day;
import com.nus.iss.travlr.models.Flight;
import com.nus.iss.travlr.models.Itinerary;
import com.nus.iss.travlr.models.Trip;
import com.nus.iss.travlr.repository.TripRepository;

@Service
public class TripService {
    @Autowired private TripRepository tripRepo;
    @Autowired private GoogleSearchAPIService googleSvc;
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

    // Create new trip
    public Trip createTrip(Trip trip) throws IllegalArgumentException {
        String image = googleSvc.searchImage(trip.getCountry() + " scenic");
        trip.setImage(image);

        LocalDate startDate = convertToLocalDateViaInstant(trip.getStartDate());
        LocalDate endDate = convertToLocalDateViaInstant(trip.getEndDate());
        long daysBetween = ChronoUnit.DAYS.between(startDate, endDate) + 1; // +1 to include end date

        List<Day> days = new ArrayList<>();
        for (int i = 0; i < daysBetween; i++) {
            LocalDate currentDay = startDate.plusDays(i);
            Day day = new Day(convertToDateViaInstant(currentDay));
            days.add(day);
        }
        Itinerary itinerary = trip.getItinerary();

        if (itinerary == null) {
            itinerary = new Itinerary();
            trip.setItinerary(itinerary);
        }

        itinerary.setDays(days);
        
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
    // Helper method to convert Date to LocalDate
    private LocalDate convertToLocalDateViaInstant(Date dateToConvert) {
        return dateToConvert.toInstant()
        .atZone(ZoneId.systemDefault())
        .toLocalDate();
    }
    // Helper method to convert LocalDate to Date
    private Date convertToDateViaInstant(LocalDate dateToConvert) {
        return java.util.Date.from(dateToConvert.atStartOfDay()
        .atZone(ZoneId.systemDefault())
        .toInstant());
    }
}
