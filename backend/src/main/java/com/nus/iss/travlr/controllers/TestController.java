package com.nus.iss.travlr.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.nus.iss.travlr.models.DTO.MessageType;
import com.nus.iss.travlr.service.MessageService;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping(path = "/test")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class TestController {
    @Autowired MessageService msgSvc;

    @GetMapping(path = "/")
    public ResponseEntity<String> test(Authentication auth) {
        System.out.println("\t Test Controller Triggered");
        String currentUserName = auth.getName(); // Get username from JWT
        JsonObject response = Json.createObjectBuilder().add("message", "Request was successful! Authenticated user: %s".formatted(currentUserName)).build();
        return ResponseEntity.ok(response.toString());
    }

    @GetMapping(path = "/pubtouserid/{userId}")
    public void pubToUser(@PathVariable String userId) {
        msgSvc.publishToUser(userId, "Test pub to user", MessageType.ITINERARY_MODIFIED);
    }
    @GetMapping(path = "/pubtotripid/{tripId}")
    public void pubToTrip(@PathVariable String tripId) {
        msgSvc.publishToTrip(tripId, "Test pub to trip", MessageType.ITINERARY_MODIFIED);
    }
}
