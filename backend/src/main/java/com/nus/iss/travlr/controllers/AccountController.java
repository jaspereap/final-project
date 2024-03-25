package com.nus.iss.travlr.controllers;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nus.iss.travlr.models.AuthData;
import com.nus.iss.travlr.models.LoginRequest;
import com.nus.iss.travlr.models.RegisterRequest;
import com.nus.iss.travlr.models.Role;
import com.nus.iss.travlr.models.UserEntity;
import com.nus.iss.travlr.service.JwtService;
import com.nus.iss.travlr.service.UserService;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping(path = "/api/v1/auth")
@CrossOrigin(origins = "*")
public class AccountController {
    @Autowired private UserService userService;
    @Autowired private JwtService jwtService;
    @Autowired private AuthenticationManager authManager;

    @PostMapping(path = "/login")
    public ResponseEntity<AuthData> postLogin(@RequestBody LoginRequest request) {
        try {
            Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            String token = jwtService.generateToken(auth);
            System.out.println("TOKEN: " + token);
            return ResponseEntity.ok(new AuthData(token));
        } catch (AuthenticationException e) {
            System.out.println(e);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
    // @PostMapping(path = "/login")
    // public ResponseEntity<AuthResponse> postLogin(Authentication auth) {
    //     System.out.println("incoming auth: " + auth);
    //     String token = jwtService.generateToken(auth);
    //     System.out.println("\t token: " + token);
    //     AuthResponse response = new AuthResponse(token);
    //     return ResponseEntity.ofNullable(response);
    // }

    // @PostMapping(path = "/login")
    // public ResponseEntity<HttpStatus> postLogin(@RequestBody String body) {
    //     System.out.println(body);
    //     JsonObject payload = Json.createReader(new StringReader(body)).readObject();
    //     String username = payload.getString("username");
    //     String password = payload.getString("password");
    //     if(userService.loginUser(username, password)) {
    //         System.out.printf("\tLogin success. \n\tUsername: %s\n\tPassword: %s\n", username, password);
    //         return ResponseEntity.ok().body(HttpStatus.ACCEPTED);
    //     };
    //     return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
    // }

    @PostMapping(path = "/register")
    public ResponseEntity<UserEntity> postRegister(@RequestBody RegisterRequest request) {
        System.out.println(request);
        UserEntity user = userService.registerUser(request, Role.USER);
        return ResponseEntity.ok().body(user);
    }
}
