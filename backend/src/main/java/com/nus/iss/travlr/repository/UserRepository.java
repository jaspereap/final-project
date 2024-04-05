package com.nus.iss.travlr.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nus.iss.travlr.models.User.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    // Automatic custom queries - generate queries from method names
    Optional<UserEntity> findUserByUsername(String username);
    Optional<UserEntity> findUserById(int id);
    boolean existsByUsername(String username);
    // List<UserEntity> findByUsernameContainingIgnoreCase(String username);
    Page<UserEntity> findByUsernameContainingIgnoreCase(String username, Pageable pageable);
}
