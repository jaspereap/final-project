package com.nus.iss.travlr.security;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
