package com.nus.iss.travlr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.nus.iss.travlr.models.Role;
import com.nus.iss.travlr.models.UserEntity;
import com.nus.iss.travlr.repository.UserRepository;
import com.nus.iss.travlr.service.UserService;

@SpringBootApplication
public class TravlrApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(TravlrApplication.class, args);
	}
	@Autowired UserRepository userRepo;
	@Autowired UserService userService;

	@Override
	public void run(String... args) throws Exception {
		// UserEntity user = new UserEntity();
		// user.setUsername("lmfao");
		// user.setPassword("fugggg");
		// userService.registerUser(user, Role.USER);
		// UserEntity retrievedUser = userRepo.findUserByUsername("lmfao").get();
		// System.out.println(retrievedUser.getRoles());
		// UserEntity retrievedUser = userRepo.findUserById(1).get();
		// System.out.println(retrievedUser);
		// userRepo.deleteById(3L);
	}

}
