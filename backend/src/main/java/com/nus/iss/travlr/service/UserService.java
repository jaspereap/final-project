package com.nus.iss.travlr.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.Trip;
import com.nus.iss.travlr.models.User.Role;
import com.nus.iss.travlr.models.User.RoleEnum;
import com.nus.iss.travlr.models.User.UserEntity;
import com.nus.iss.travlr.repository.RoleRepository;
import com.nus.iss.travlr.repository.TripRepository;
import com.nus.iss.travlr.repository.UserRepository;

@Service
public class UserService {
    @Autowired private UserRepository userRepo;
    @Autowired private RoleRepository roleRepo;
    @Autowired PasswordEncoder passwordEncoder;
    @Autowired private TripRepository tripRepo;
    public UserEntity registerUser(UserEntity user) {
        Set<Role> roles = new HashSet<>();
        Role role = roleRepo.findByName(RoleEnum.USER).orElseThrow(() -> new RuntimeException("Role doesn't exist"));
        roles.add(role);
        user.setRoles(roles);
        return userRepo.save(user);
    }

    public boolean loginUser(String username, String password) {
        Optional<UserEntity> optUser = userRepo.findUserByUsername(username);
        if (!optUser.isEmpty()) {
            return optUser.get().getPassword().equals(password);
        }
        return false;
    }

    public List<UserEntity> getUsersByUsername(String username, int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        Page<UserEntity> page = userRepo.findByUsernameContainingIgnoreCase(username, pageable);
        return page.getContent();
    }

    public Optional<UserEntity> getUserByUserId(Long userId) {
        return userRepo.findUserById(userId);
    }
// TODO
public List<UserEntity> getUsersFromTrip(String tripId) {
    Optional<Trip> optTrip = tripRepo.findById(tripId);
    if (optTrip.isEmpty()) {
        return Collections.emptyList(); // Return an empty list instead of null
    }
    Trip trip = optTrip.get();
    Set<Long> tripUsers = trip.getTripMatesId();
    tripUsers.add(trip.getOwnerId());
    return userRepo.findByIdIn(tripUsers);
}

}
