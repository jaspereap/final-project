package com.nus.iss.travlr.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.maps.DirectionsApi.Response;
import com.nus.iss.travlr.models.Flight;
import com.nus.iss.travlr.models.DTO.MessageType;
import com.nus.iss.travlr.models.DTO.Request.FlightRequest;
import com.nus.iss.travlr.models.DTO.Request.IdentityToken;
import com.nus.iss.travlr.service.FlightService;
import com.nus.iss.travlr.service.MessageService;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;

@RestController
@RequestMapping(path = "/api/v1/flight")
@CrossOrigin(origins = "*")
public class FlightController {
    @Autowired private MessageService msgSvc;
    @Autowired private FlightService flightSvc;

    @PostMapping(path = "/add/{tripId}")
    public ResponseEntity<String> addNewFlight(@PathVariable String tripId, @RequestBody FlightRequest flightRequest) {
        System.out.println("flight request: " + flightRequest);
        List<Flight> flightDetails = flightSvc.addFlight(tripId, flightRequest);
        JsonArrayBuilder flightDetailsArrBuilder = Json.createArrayBuilder();
        for (Flight flight : flightDetails) {
            flightDetailsArrBuilder.add(flight.toJson());
        }
        JsonArray flightDetailsArr = flightDetailsArrBuilder.build();
        msgSvc.publishToTripWithAuthor(tripId, flightDetailsArr.toString(), MessageType.FLIGHT_ADDED, flightRequest.getIdentity().getUsername());
        return ResponseEntity.ok(flightDetailsArr.toString());
    }

    // TODO:
    @PutMapping(path = "/delete/{tripId}/{index}")
    public ResponseEntity<String> deleteFlight(@PathVariable String tripId, @PathVariable String index, @RequestBody IdentityToken identity) {
        System.out.println("delete flight controller");
        List<Flight> flightDetails = flightSvc.deleteFlight(tripId, index);
        JsonArrayBuilder flightDetailsArrBuilder = Json.createArrayBuilder();
        for (Flight flight : flightDetails) {
            flightDetailsArrBuilder.add(flight.toJson());
        }
        JsonArray flightDetailsArr = flightDetailsArrBuilder.build();
        msgSvc.publishToTripWithAuthor(tripId, flightDetailsArr.toString(), MessageType.FLIGHT_MODIFIED, identity.getUsername());
        return ResponseEntity.ok(flightDetailsArr.toString());
    }
}
