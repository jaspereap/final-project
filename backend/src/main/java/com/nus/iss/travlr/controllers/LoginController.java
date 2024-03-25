package com.nus.iss.travlr.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1")
@CrossOrigin(origins = "*")
public class LoginController {
    @PostMapping(path = "/login")
    public ResponseEntity<HttpStatus> postLogin() {
        return ResponseEntity.badRequest().body(HttpStatus.ACCEPTED);
    }
}
