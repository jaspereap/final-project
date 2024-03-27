package com.nus.iss.travlr.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.User.Role;
import com.nus.iss.travlr.models.User.RoleEnum;
import com.nus.iss.travlr.models.User.UserEntity;
import com.nus.iss.travlr.repository.RoleRepository;
import com.nus.iss.travlr.repository.UserRepository;

@Service
public class UserService {
    @Autowired private UserRepository userRepo;
    @Autowired private RoleRepository roleRepo;
    @Autowired PasswordEncoder passwordEncoder;

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
}
