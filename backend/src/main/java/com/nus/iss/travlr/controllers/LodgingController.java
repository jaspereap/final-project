package com.nus.iss.travlr.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nus.iss.travlr.models.Lodging;
import com.nus.iss.travlr.models.MessageType;
import com.nus.iss.travlr.models.DTO.Request.IdentityToken;
import com.nus.iss.travlr.models.DTO.Request.LodgingRequest;
import com.nus.iss.travlr.service.LodgingService;
import com.nus.iss.travlr.service.MessageService;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;

@RestController
@RequestMapping(path = "/api/v1/lodging")
@CrossOrigin(origins = "*")
public class LodgingController {
    @Autowired private MessageService msgSvc;
    @Autowired private LodgingService lodgingSvc;

    @PostMapping(path = "/add/{tripId}")
    public ResponseEntity<String> addNewLodging(@PathVariable String tripId, @RequestBody LodgingRequest lodgingRequest) {
        // System.out.println("lodging request: " + lodgingRequest);
        List<Lodging> lodgingDetails = lodgingSvc.addLodging(tripId, lodgingRequest);
        JsonArrayBuilder lodgingDetailsArrBuilder = Json.createArrayBuilder();
        for (Lodging lodging : lodgingDetails) {
            lodgingDetailsArrBuilder.add(lodging.toJson());
        }
        JsonArray lodgingDetailsArr = lodgingDetailsArrBuilder.build();
        msgSvc.publishToTripWithAuthor(tripId, lodgingDetailsArr.toString(), MessageType.LODGING_ADDED, lodgingRequest.getIdentity().getUsername());
        return ResponseEntity.ok(lodgingDetailsArr.toString());
    }
    
    @PutMapping(path = "/delete/{tripId}/{index}")
    public ResponseEntity<String> deleteLodging(@PathVariable String tripId, @PathVariable String index, @RequestBody IdentityToken identity) {
        System.out.println("delete lodging controller");
        List<Lodging> lodgingDetails = lodgingSvc.deleteLodging(tripId, index);
        JsonArrayBuilder lodgingDetailsArrBuilder = Json.createArrayBuilder();
        for (Lodging lodging : lodgingDetails) {
            lodgingDetailsArrBuilder.add(lodging.toJson());
        }
        JsonArray lodgingDetailsArr = lodgingDetailsArrBuilder.build();
        msgSvc.publishToTripWithAuthor(tripId, lodgingDetailsArr.toString(), MessageType.LODGING_MODIFIED, identity.getUsername());
        return ResponseEntity.ok(lodgingDetailsArr.toString());
    }
}
