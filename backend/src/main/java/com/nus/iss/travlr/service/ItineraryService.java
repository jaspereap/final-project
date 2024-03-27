package com.nus.iss.travlr.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.Itinerary;
import com.nus.iss.travlr.repository.ItineraryRepository;

@Service
public class ItineraryService {
    @Autowired ItineraryRepository itiRepo;

    public Optional<Itinerary> getItineraryById(String id) {
        return itiRepo.findById(id);
    }

    public void addUserToItinerary(String itineraryId, Long userId) {
        Itinerary itinerary = itiRepo.findById(itineraryId)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));
        itinerary.getTripMatesId().add(userId);
        itiRepo.save(itinerary);
    }

    public List<Itinerary> getAccessibleItineraries(Long userId) {
        List<Itinerary> owned = itiRepo.findByOwnerId(userId);
        List<Itinerary> invited = itiRepo.findByTripMatesIdContains(userId);
        // Combine and return the lists; ensure there are no duplicates
        return Stream.concat(owned.stream(), invited.stream())
                .distinct()
                .collect(Collectors.toList());
    }
}
