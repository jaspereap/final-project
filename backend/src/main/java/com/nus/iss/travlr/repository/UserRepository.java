package com.nus.iss.travlr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nus.iss.travlr.models.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    // Automatic custom queries - generate queries from method names
    Optional<UserEntity> findUserByUsername(String username);
    Optional<UserEntity> findUserById(int id);
}
