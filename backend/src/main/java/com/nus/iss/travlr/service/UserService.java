package com.nus.iss.travlr.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.RegisterRequest;
import com.nus.iss.travlr.models.Role;
import com.nus.iss.travlr.models.UserEntity;
import com.nus.iss.travlr.repository.UserRepository;

@Service
public class UserService {
    @Autowired private UserRepository userRepo;
    @Autowired PasswordEncoder passwordEncoder;

    public UserEntity registerUser(RegisterRequest request, Role role) {
        // Implement registration logic (e.g., checking if username exists)
        UserEntity user = new UserEntity();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(role);
        return userRepo.save(user);
    }

    public boolean loginUser(String username, String password) {
        Optional<UserEntity> optUser = userRepo.findUserByUsername(username);
        if (!optUser.isEmpty()) {
            return optUser.get().getPassword().equals(password);
        }
        return false;
    }
}
