package com.nus.iss.travlr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nus.iss.travlr.models.Costing;
import com.nus.iss.travlr.models.Lodging;
import com.nus.iss.travlr.models.Trip;
import com.nus.iss.travlr.models.DTO.Request.LodgingRequest;
import com.nus.iss.travlr.repository.TripRepository;

@Service
public class LodgingService {
    @Autowired private TripRepository tripRepo;
    
    @Transactional
    public List<Lodging> addLodging(String tripId, LodgingRequest lodging) {
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        if (optTrip.isEmpty()) {
            return null;
        }
        Trip trip = optTrip.get();
        trip.getLodgings().add(lodging.toLodging());
        return tripRepo.save(trip).getLodgings();
    }

    @Transactional
    public List<Lodging> deleteLodging(String tripId, String index) {
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        if (optTrip.isEmpty()) {
            return null;
        }
        Trip trip = optTrip.get();
        try {
            trip.getLodgings().remove(Integer.parseInt(index));
        } catch (Exception e) {
            return trip.getLodgings();
        }
        return tripRepo.save(trip).getLodgings();
    }
    @Transactional
    public List<Lodging> addLodgingCosting(String tripId, String lodgingIndex, Costing costing) {
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        if (optTrip.isEmpty()) {
            return null;
        }
        Trip trip = optTrip.get();
        trip.getLodgings().get(Integer.parseInt(lodgingIndex)).getCostings().add(costing);
        return tripRepo.save(trip).getLodgings();
    }

    @Transactional
    public List<Lodging> deleteLodgingCosting(String tripId, String lodgingIndex, String costingIndex) {
        Optional<Trip> optTrip = tripRepo.findById(tripId);
        if (optTrip.isEmpty()) {
            return null;
        }
        Trip trip = optTrip.get();
        trip.getLodgings().get(Integer.parseInt(lodgingIndex)).getCostings().remove(Integer.parseInt(costingIndex));
        return tripRepo.save(trip).getLodgings();
    }
}
