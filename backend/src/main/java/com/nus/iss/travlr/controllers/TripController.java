package com.nus.iss.travlr.controllers;

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

import com.nus.iss.travlr.models.Trip;
import com.nus.iss.travlr.models.DTO.Request.TripRequest;
import com.nus.iss.travlr.models.DTO.Response.MessageResponse;
import com.nus.iss.travlr.service.TripService;

@RestController
@RequestMapping(path = "/api/v1/trip")
@CrossOrigin(origins = "*")
public class TripController {

    @Autowired private TripService tripSvc;

    // TODO: complete add trip
    @PostMapping(path = "/new")
    public ResponseEntity<String> postAddTrip(@RequestBody TripRequest request) {
        System.out.println("\tPost add trip controller triggered");
        System.out.println("\tRequest: " + request);
        System.out.println(request.getStart());
        return ResponseEntity.ok(new MessageResponse("success").get());
    }

    @GetMapping(path = "/{tripId}")
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
