package com.nus.iss.travlr.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.issuer}")
    private String issuer;

    public String generateToken(Authentication auth) {
        System.out.println("authentication: " + auth);
        String username = auth.getName();
        Instant now = Instant.now();
        String scope = auth.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        String token = JWT.create()
            .withIssuer(issuer)
            .withIssuedAt(now)
            .withSubject(username)
            .withExpiresAt(now.plus(24, ChronoUnit.HOURS))
            .withClaim("name", auth.getName())
            .withClaim("scope", scope)
            .sign(Algorithm.HMAC256(secretKey));
        return token;
    }
}
