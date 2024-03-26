package com.nus.iss.travlr.controllers;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import com.nus.iss.travlr.repository.UserRepository;
import com.nus.iss.travlr.service.JwtService;
import com.nus.iss.travlr.service.UserService;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping(path = "/api/v1/auth")
@CrossOrigin(origins = "*")
public class AccountController {
    @Autowired private UserService userService;
    @Autowired private UserRepository userRepo;
    @Autowired private JwtService jwtService;
    @Autowired private PasswordEncoder encoder;
    @Autowired private AuthenticationManager authManager;

    @PostMapping(path = "/login")
    public ResponseEntity<AuthData> postLogin(@RequestBody LoginRequest request) {
        try {
            Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(auth);

            UserEntity userDetails = (UserEntity) auth.getPrincipal();
            
            String token = jwtService.generateToken(userDetails);
            System.out.println("TOKEN: " + token);
            return ResponseEntity.ok(new AuthData(token));
            
        } catch (AuthenticationException e) {
            System.out.println(e);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @PostMapping(path = "/register")
    public ResponseEntity<?> postRegister(@RequestBody RegisterRequest request) {
        System.out.println(request);
        // UserEntity user = userService.registerUser(request, Role.USER);
        if (userRepo.existsByUsername(request.getUsername())) {
            System.out.println("Username already exists!");
            return ResponseEntity.badRequest().build();
        }
        UserEntity user = new UserEntity(request.getUsername(), request.getEmail(), encoder.encode(request.getPassword()));
        userService.registerUser(user);
        return ResponseEntity.ok().body(user);
    }
}
