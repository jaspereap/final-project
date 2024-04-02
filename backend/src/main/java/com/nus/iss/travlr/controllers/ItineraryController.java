package com.nus.iss.travlr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.nus.iss.travlr.models.Itinerary;
import com.nus.iss.travlr.service.ItineraryService;

@RestController
@RequestMapping(path = "/api/v1/itinerary")
@CrossOrigin(origins = "*")
public class ItineraryController {
    @Autowired private ItineraryService itiSvc;

    @GetMapping(path = "/get/{tripId}")
    public ResponseEntity<String> getItinerary(@PathVariable String tripId) {
        Itinerary retrievedItinerary = itiSvc.getItineraryByTripId(tripId);
        return ResponseEntity.ok(retrievedItinerary.toJson().toString());
    }
}
