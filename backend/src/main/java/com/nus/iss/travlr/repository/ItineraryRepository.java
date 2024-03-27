package com.nus.iss.travlr.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.nus.iss.travlr.models.Itinerary;

@Repository
public interface ItineraryRepository extends MongoRepository<Itinerary, String> {
    List<Itinerary> findByOwnerId(Long ownerId);
    List<Itinerary> findByTripMatesIdContains(Long userId);
}
