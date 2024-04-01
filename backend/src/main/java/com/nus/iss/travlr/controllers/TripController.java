package com.nus.iss.travlr.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.messaging.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nus.iss.travlr.TripUtils;
import com.nus.iss.travlr.models.Trip;
import com.nus.iss.travlr.models.DTO.TripCard;
import com.nus.iss.travlr.models.DTO.Request.IdentityRequest;
import com.nus.iss.travlr.models.DTO.Request.TripRequest;
import com.nus.iss.travlr.models.DTO.Response.MessageResponse;
import com.nus.iss.travlr.models.DTO.Response.TripResponse;
import com.nus.iss.travlr.service.TripService;

import jakarta.json.Json;
import jakarta.json.JsonArray;

@RestController
@RequestMapping(path = "/api/v1/trip")
@CrossOrigin(origins = "*")
public class TripController {

    @Autowired private TripService tripSvc;

    @PostMapping(path = "/all")
    public ResponseEntity<String> getTrips(@RequestBody IdentityRequest request) {
        System.out.println("\tGet TripSSSS controller triggered");
        System.out.println(request);
        ArrayList<Trip> trips = tripSvc.getAllTripsByUserId(request.getUserId());
        System.out.println(trips);
        JsonArray tripCards = TripUtils.tripToTripCards(trips);
        return ResponseEntity.ok(tripCards.toString());
        // return ResponseEntity.ok(new MessageResponse("success").get());
    }

    // TODO: complete add trip
    @PostMapping(path = "/new")
    public ResponseEntity<String> postAddTrip(@RequestBody TripRequest request) {
        System.out.println("\tPost add trip controller triggered");
        System.out.println("\tRequest: " + request);
        System.out.println(request.getStart());
        Trip newTrip = new Trip(
            request.getIdentity().getUserId(), 
            request.getCountry(), 
            request.getStart(), 
            request.getEnd());
        Trip createdTrip;
        try {
            createdTrip = tripSvc.createTrip(newTrip);
        } catch (Exception e) {
            System.out.println("Trip creation failed: " + e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create the trip").get());
        }
        return ResponseEntity.ok(new TripResponse(createdTrip).toJson().toString());
    }

    @GetMapping(path = "/show/{tripId}")
    public ResponseEntity<String> getTrip(@PathVariable String tripId) {
        System.out.println("\tGet trip controller triggered");
        System.out.println("\ttripId: " + tripId);
        Optional<Trip> optTrip = tripSvc.getTrip(tripId);
        if (!optTrip.isEmpty()) {
            return ResponseEntity.ok(optTrip.get().toJson().toString());
        }
        return ResponseEntity.ok(new MessageResponse("success").get());
    }
}
