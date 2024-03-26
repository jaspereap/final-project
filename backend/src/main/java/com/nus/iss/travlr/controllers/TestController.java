package com.nus.iss.travlr.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping(path = "/api/v1")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class TestController {
    
    @GetMapping(path = "/test")
    public ResponseEntity<String> test(Authentication auth) {
        System.out.println("\t Test Controller Triggered");
        String currentUserName = auth.getName(); // Get username from JWT
        JsonObject response = Json.createObjectBuilder().add("message", "Request was successful! Authenticated user: %s".formatted(currentUserName)).build();
        return ResponseEntity.ok(response.toString());
    }
}
