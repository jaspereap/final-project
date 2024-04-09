package com.nus.iss.travlr.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.nus.iss.travlr.models.DTO.UserDTO;
import com.nus.iss.travlr.models.DTO.Request.IdentityToken;
import com.nus.iss.travlr.models.DTO.Request.TripMateRequest;
import com.nus.iss.travlr.models.DTO.Request.TripRequest;
import com.nus.iss.travlr.models.DTO.Response.MessageResponse;
import com.nus.iss.travlr.models.DTO.Response.TripResponse;
import com.nus.iss.travlr.service.TripService;

import jakarta.json.JsonArray;

@RestController
@RequestMapping(path = "/api/v1/trip")
@CrossOrigin(origins = "*")
public class TripController {

    @Autowired private TripService tripSvc;

    // For displaying tripcards at homepage
    @PostMapping(path = "/all")
    public ResponseEntity<String> getTrips(@RequestBody IdentityToken request) {
        System.out.println("\tGet Trip controller triggered");
        // System.out.println(request);
        ArrayList<Trip> trips = tripSvc.getAllTripsByUserId(request.getUserId());
        JsonArray tripCards = TripUtils.tripToTripCards(trips);
        return ResponseEntity.ok(tripCards.toString());
    }

    // For creating a fresh trip
    @PostMapping(path = "/new")
    public ResponseEntity<String> postAddTrip(@RequestBody TripRequest request) {
        System.out.println("\tPost add trip controller triggered");
        // System.out.println("\tRequest: " + request);
        Trip newTrip = new Trip(
            request.getIdentity().getUserId(), 
            request.getCountry(), 
            request.getStart(), 
            request.getEnd());
        for (UserDTO user : request.getTripMates()) {
            newTrip.getTripMatesId().add(user.getUserId());
        }
        Trip createdTrip;
        try {
            createdTrip = tripSvc.createTrip(newTrip);
        } catch (Exception e) {
            System.out.println("Trip creation failed: " + e);
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to create the trip").get());
        }
        return ResponseEntity.ok(new TripResponse(createdTrip).toJson().toString());
    }

    // For retrieving a single trip details
    @GetMapping(path = "/show/{tripId}")
    public ResponseEntity<String> getTrip(@PathVariable String tripId) {
        System.out.println("\tGet trip controller triggered");
        // System.out.println("\ttripId: " + tripId);
        Optional<Trip> optTrip = tripSvc.getTrip(tripId);
        if (!optTrip.isEmpty()) {
            return ResponseEntity.ok(optTrip.get().toJson().toString());
        }
        return ResponseEntity.ok(optTrip.get().toJson().toString());
    }

    // For checking if user is allowed to view trip
    @GetMapping(path = "/is-allowed")
    public ResponseEntity<Boolean> getAllowedUsers(@RequestParam String tripId, @RequestParam String userId) {
        System.out.println("get allowed users controller");
        System.out.println("\tparamsssss: " + userId);
        System.out.println("\tparamsssss: " + tripId);
        return ResponseEntity.ok(tripSvc.checkIsAllowed(tripId, userId));
    }

    @PostMapping(path = "/add/trip-mate/{tripId}/{newUsername}")
    public ResponseEntity<String> postAddTripMate(@PathVariable String tripId, @PathVariable String newUsername, @RequestBody IdentityToken identity) {
        System.out.println("post add trip mate controller");
        System.out.println("New username: " + newUsername);
        Trip trip = tripSvc.addTripMateByUsername(tripId, newUsername);
        return ResponseEntity.ok(trip.toJson().toString());
    }
    @PostMapping(path = "/delete/trip-mate/{tripId}/{userId}")
    public ResponseEntity<String> postDeleteTripMate(@PathVariable String tripId, @PathVariable String userId, @RequestBody IdentityToken identity) {
        System.out.println("post add trip mate controller");
        System.out.println("Delete user id: " + userId);
        Trip trip = tripSvc.deleteTripMateByUserId(tripId, userId);
        return ResponseEntity.ok(trip.toJson().toString());
    }
}
