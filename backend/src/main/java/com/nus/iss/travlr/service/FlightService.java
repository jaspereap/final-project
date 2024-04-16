package com.nus.iss.travlr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nus.iss.travlr.models.Costing;
import com.nus.iss.travlr.models.Flight;
import com.nus.iss.travlr.models.Trip;
import com.nus.iss.travlr.models.DTO.Request.FlightRequest;
import com.nus.iss.travlr.repository.TripRepository;

@Service
public class FlightService {
    @Autowired private TripRepository tripRepo;

    @Transactional
    public List<Flight> addFlight(String tripId, FlightRequest flight) {
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        if (optTrip.isEmpty()) {
            return null;
        }
        Trip trip = optTrip.get();
        trip.getFlightDetails().add(flight.toFlight());
        return tripRepo.save(trip).getFlightDetails();
    }

    @Transactional
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

    @Transactional
    public List<Flight> addFlightCosting(String tripId, String flightIndex, Costing costing) {
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        if (optTrip.isEmpty()) {
            return null;
        }
        Trip trip = optTrip.get();
        trip.getFlightDetails().get(Integer.parseInt(flightIndex)).getCostings().add(costing);
        return tripRepo.save(trip).getFlightDetails();
    }

    @Transactional
    public List<Flight> deleteFlightCosting(String tripId, String flightIndex, String costingIndex) {
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        if (optTrip.isEmpty()) {
            return null;
        }
        Trip trip = optTrip.get();
        trip.getFlightDetails().get(Integer.parseInt(flightIndex)).getCostings().remove(Integer.parseInt(costingIndex));
        return tripRepo.save(trip).getFlightDetails();
    }
}
