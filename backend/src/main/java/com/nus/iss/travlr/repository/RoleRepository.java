package com.nus.iss.travlr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nus.iss.travlr.models.User.Role;
import com.nus.iss.travlr.models.User.RoleEnum;

public interface RoleRepository extends JpaRepository<Role, Long>{
    Optional<Role> findByName(RoleEnum name);
}
