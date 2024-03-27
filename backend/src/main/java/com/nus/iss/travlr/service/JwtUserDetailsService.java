package com.nus.iss.travlr.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nus.iss.travlr.models.User.Role;
import com.nus.iss.travlr.models.User.UserEntity;
import com.nus.iss.travlr.repository.UserRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> optUser = userRepo.findUserByUsername(username);
        if (optUser.isEmpty()) {
            throw new UsernameNotFoundException("Username not found!");
        }
        UserEntity user = optUser.get();
        return user;
    }
}
