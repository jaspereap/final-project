package com.nus.iss.travlr.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nus.iss.travlr.models.DTO.Request.TripRequest;
import com.nus.iss.travlr.models.DTO.Response.MessageResponse;

@RestController
@RequestMapping(path = "/api/v1/trip")
@CrossOrigin(origins = "*")
public class TripController {
    @PostMapping(path = "/new")
    public ResponseEntity<String> postAddTrip(@RequestBody TripRequest request) {
        System.out.println("\tPost add trip controller triggered");
        System.out.println("\tRequest: " + request);
        System.out.println(request.getStart());
        return ResponseEntity.ok(new MessageResponse("success").get());
    }
}
