package com.nus.iss.travlr.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nus.iss.travlr.models.DTO.UserDTO;
import com.nus.iss.travlr.models.DTO.Response.MessageResponse;
import com.nus.iss.travlr.models.User.UserEntity;
import com.nus.iss.travlr.service.UserService;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;

@RestController
@RequestMapping(path = "/api/v1/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired private UserService userService;

    @GetMapping(path = "/search")
    public ResponseEntity<String> searchUsers(@RequestParam String username, @RequestParam(defaultValue = "2") int limit) {
        System.out.println("get users controller");
        System.out.println("Request param: " + username);
        List<UserEntity> retrievedUsers = userService.getUsersByUsername(username, limit);
        System.out.println(retrievedUsers);
        JsonArrayBuilder usersArr = Json.createArrayBuilder();
        for (UserEntity user : retrievedUsers) {
            usersArr.add(new UserDTO(user).toJson());
        }
        System.out.println(usersArr.toString());
        return ResponseEntity.ok(usersArr.build().toString());
    }

    @GetMapping(path = "user")
    public ResponseEntity<String> getUserDetails(@RequestParam String userId) {
        System.out.println("get user details controller");
        Optional<UserEntity> optUser = userService.getUserByUserId(Long.parseLong(userId));
        if (optUser.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found").get());
        }
        UserDTO user = new UserDTO(optUser.get());
        return ResponseEntity.ok(user.toJson().toString());
    }
}
