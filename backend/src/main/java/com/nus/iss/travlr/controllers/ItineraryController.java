package com.nus.iss.travlr.controllers;

import java.io.StringReader;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.nus.iss.travlr.models.Itinerary;
import com.nus.iss.travlr.models.Place;
import com.nus.iss.travlr.models.DTO.MessageType;
import com.nus.iss.travlr.models.DTO.Request.PlaceRequest;
import com.nus.iss.travlr.models.DTO.Response.MessageResponse;
import com.nus.iss.travlr.service.ItineraryService;
import com.nus.iss.travlr.service.MessageService;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping(path = "/api/v1/itinerary")
@CrossOrigin(origins = "*")
public class ItineraryController {
    @Autowired private ItineraryService itiSvc;
    @Autowired private MessageService msgSvc;

    @GetMapping(path = "/get/{tripId}")
    public ResponseEntity<String> getItinerary(@PathVariable String tripId) {
        Itinerary retrievedItinerary = itiSvc.getItineraryByTripId(tripId);
        System.out.println("getItinerary: ");
        // System.out.println(retrievedItinerary.getDays().getFirst().getDate().getTime());
        // System.out.println(retrievedItinerary.getDays().getFirst().getPlaces().getFirst().getStart().getTime());
        // System.out.println(retrievedItinerary.getDays().getFirst().getPlaces().getFirst().getEnd().getTime());
        return ResponseEntity.ok(retrievedItinerary.toJson().toString());
    }

    @PutMapping(path = "/update/{tripId}/{date}/{rank}")
    public ResponseEntity<String> updateItineraryDayPlace(
            @PathVariable String tripId, 
            @PathVariable String date, 
            @PathVariable String rank, 
            @RequestBody Place place) {
        System.out.println("\tupdate Itinerary day place controller");
        System.out.println("Request: " + place);
        Itinerary updatedIti = itiSvc.updatePlaceInItineraryDay(tripId, date, rank, place);
        // Temp test
        msgSvc.publishToTrip(tripId, updatedIti.toJson().toString(), MessageType.ITINERARY_MODIFIED);
        return ResponseEntity.ok(updatedIti.toJson().toString());
    }

    @PostMapping(path = "/add/{tripId}/{date}")
    public ResponseEntity<String> postAddPlaceToItineraryDay(@PathVariable String tripId, @PathVariable String date, @RequestBody String placeData) {
        System.out.println("\tPost add palce to date controller");
        System.out.println("\ttripId: " + tripId);
        System.out.println("\tTo date: " + new Date(Long.parseLong(date)));
        System.out.println("\tplaceData: " + placeData);
        JsonObject placeRequest = Json.createReader(new StringReader(placeData)).readObject().getJsonObject("place");
        JsonObject placeLocation = placeRequest.getJsonObject("latlng");

        PlaceRequest place = new PlaceRequest(
            placeRequest.getString("name", ""), 
            placeRequest.getString("address", ""), 
            new Float[]{
                (float) placeLocation.getJsonNumber("lat").doubleValue(), 
                (float) placeLocation.getJsonNumber("lng").doubleValue()
            },
            placeRequest.getString("image")
        );

        System.out.println(place);

        Itinerary itinerary = itiSvc.addPlaceToItineraryDay(tripId, date, place);
        msgSvc.publishToTrip(tripId, itinerary.toJson().toString(), MessageType.ITINERARY_MODIFIED);
        return ResponseEntity.ok(itinerary.toJson().toString());
    }
}
