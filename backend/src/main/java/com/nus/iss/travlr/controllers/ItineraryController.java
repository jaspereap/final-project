package com.nus.iss.travlr.controllers;

import java.io.StringReader;
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
import com.nus.iss.travlr.models.MessageType;
import com.nus.iss.travlr.models.DTO.Request.CostingsRequest;
import com.nus.iss.travlr.models.DTO.Request.IdentityToken;
import com.nus.iss.travlr.models.DTO.Request.NewPlaceRequest;
import com.nus.iss.travlr.models.DTO.Request.UpdatePlaceRequest;
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
        // System.out.println("getItinerary: ");
        return ResponseEntity.ok(retrievedItinerary.toJson().toString());
    }
// For updating place
    @PutMapping(path = "/update/{tripId}/{date}/{rank}")
    public ResponseEntity<String> updateItineraryDayPlace(
            @PathVariable String tripId, 
            @PathVariable String date, 
            @PathVariable String rank, 
            @RequestBody UpdatePlaceRequest updatePlaceRequest) {
        System.out.println("\tupdate Itinerary day place controller");
        // System.out.println("Request: " + updatePlaceRequest);

        Itinerary updatedIti = itiSvc.updatePlaceInItineraryDay(tripId, date, rank, updatePlaceRequest.toPlace());
        msgSvc.publishToTripWithAuthor(tripId, updatedIti.toJson().toString(), MessageType.ITINERARY_MODIFIED, updatePlaceRequest.getIdentity().getUsername());
        return ResponseEntity.ok(updatedIti.toJson().toString());
    }
// For adding new place
    @PostMapping(path = "/add/{tripId}/{date}")
    public ResponseEntity<String> postAddPlaceToItineraryDay(
            @PathVariable String tripId, 
            @PathVariable String date, 
            @RequestBody String placeData) {
        System.out.println("\tPost add place to date controller");
        Itinerary itinerary = new Itinerary();
        try {
            JsonObject placeRequest = Json.createReader(new StringReader(placeData)).readObject();
            JsonObject identity = placeRequest.getJsonObject("identity");
            JsonObject placeLocation = placeRequest.getJsonObject("latlng");
    
            NewPlaceRequest place = new NewPlaceRequest(
                new IdentityToken(identity.getString("username", "unknown"), identity.getInt("userId", 0)),
                placeRequest.getString("name", ""), 
                placeRequest.getString("address", ""), 
                new Float[]{
                    (float) placeLocation.getJsonNumber("lat").doubleValue(), 
                    (float) placeLocation.getJsonNumber("lng").doubleValue()
                },
                placeRequest.getString("image")
                );
            itinerary = itiSvc.addPlaceToItineraryDay(tripId, date, place);
            msgSvc.publishToTripWithAuthor(tripId, itinerary.toJson().toString(), MessageType.ITINERARY_ADDED, place.getIdentity().getUsername());
        } catch (Exception e) {
            System.out.println("Error adding place: " + e.getMessage());
        }

        return ResponseEntity.ok(itinerary.toJson().toString());
    }

    @PutMapping(path = "/delete/{tripId}/{date}/{rank}")
    public ResponseEntity<String> deleteItineraryPlace(            
        @PathVariable String tripId, 
        @PathVariable String date, 
        @PathVariable String rank,  
        @RequestBody IdentityToken identity) {
        System.out.println("delete itinerary place controller");
        Itinerary itinerary = itiSvc.deleteItineraryPlace(tripId, date, rank);
        msgSvc.publishToTripWithAuthor(tripId, itinerary.toJson().toString(), MessageType.ITINERARY_MODIFIED, identity.getUsername());
        return ResponseEntity.ok(itinerary.toJson().toString());
    }

    @PostMapping(path = "/costings/add/{tripId}/{date}/{rank}")
    public ResponseEntity<String> postAddCosting (
        @PathVariable String tripId, 
        @PathVariable String date, 
        @PathVariable String rank,  
        @RequestBody CostingsRequest costingsRequest
    ) {
        System.out.println("post add costings controller");
        System.out.println("costing req: " + costingsRequest);
        Itinerary itinerary = itiSvc.addCostingToItineraryPlace(tripId, date, rank, costingsRequest.toCosting());
        msgSvc.publishToTripWithAuthor(tripId, itinerary.toJson().toString(), MessageType.ITINERARY_MODIFIED, costingsRequest.getIdentity().getUsername());
        return ResponseEntity.ok(itinerary.toJson().toString());
    }

    @PutMapping(path = "/costings/delete/{tripId}/{date}/{rank}/{costingIndex}")
    public ResponseEntity<String> deleteCosting(            
        @PathVariable String tripId, 
        @PathVariable String date, 
        @PathVariable String rank,  
        @PathVariable String costingIndex,
        @RequestBody IdentityToken identity) {
        System.out.println("delete costing controller");
        Itinerary itinerary = itiSvc.deleteCosting(tripId, date, rank, costingIndex);
        msgSvc.publishToTripWithAuthor(tripId, itinerary.toJson().toString(), MessageType.ITINERARY_MODIFIED, identity.getUsername());
        return ResponseEntity.ok(itinerary.toJson().toString());
    }
}
