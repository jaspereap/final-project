package com.nus.iss.travlr.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.nus.iss.travlr.models.Trip;

@Repository
public interface TripRepository extends MongoRepository<Trip, String> {
    List<Trip> findByTripMatesIdContains(Long userId);
    List<Trip> findByOwnerId(Long ownerId);
}
