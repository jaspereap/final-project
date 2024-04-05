package com.nus.iss.travlr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.Flight;
import com.nus.iss.travlr.models.Trip;
import com.nus.iss.travlr.models.DTO.Request.FlightRequest;
import com.nus.iss.travlr.repository.TripRepository;

@Service
public class FlightService {
    @Autowired private TripRepository tripRepo;

    public List<Flight> addFlight(String tripId, FlightRequest flight) {
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        if (optTrip.isEmpty()) {
            return null;
        }
        Trip trip = optTrip.get();
        trip.getFlightDetails().add(flight.toFlight());
        return tripRepo.save(trip).getFlightDetails();
    }

    public List<Flight> deleteFlight(String tripId, String index) {
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        if (optTrip.isEmpty()) {
            return null;
        }
        Trip trip = optTrip.get();
        try {
            trip.getFlightDetails().remove(Integer.parseInt(index));
        } catch (Exception e) {
            return trip.getFlightDetails();
        }
        return tripRepo.save(trip).getFlightDetails();
    }
}
