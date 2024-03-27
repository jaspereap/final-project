package com.nus.iss.travlr;

import java.sql.Time;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.nus.iss.travlr.models.Day;
import com.nus.iss.travlr.models.Itinerary;
import com.nus.iss.travlr.models.Lodging;
import com.nus.iss.travlr.models.Place;
import com.nus.iss.travlr.models.User.Role;
import com.nus.iss.travlr.models.User.UserEntity;
import com.nus.iss.travlr.repository.ItineraryRepository;
import com.nus.iss.travlr.repository.UserRepository;
import com.nus.iss.travlr.service.UserService;

@SpringBootApplication
public class TravlrApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(TravlrApplication.class, args);
	}
	@Autowired UserRepository userRepo;
	@Autowired UserService userService;
	@Autowired ItineraryRepository itiRepo;
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
		// Optional<Itinerary> optIti = itiRepo.findById("1");

		// System.out.println(optIti.get());
		// createAndSaveItinerary();
		List<Itinerary> list = itiRepo.findByTripMatesIdContains(5L);
		System.out.println(list);
	}
	
	public void createAndSaveItinerary() {
		// Creating a place
		Place place = new Place(1, "Eiffel Tower", "image_url", "A must-see landmark in Paris", new Date(), new Date(), "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France", new String[]{"48.8584", "2.2945"});
		
		// Creating lodging
		Lodging lodging = new Lodging("Hotel Paris", 200.0f, "Nice view of the Eiffel Tower", new Date(), new Date());
		
		// Creating a day
		Day day = new Day(new Date(), Arrays.asList(lodging), Arrays.asList(place));
		
		// Creating an itinerary
		Set<Long> tripMatesId = new HashSet<>();
		tripMatesId.add(5L);
		Itinerary itinerary = new Itinerary("1", 4L, tripMatesId, Arrays.asList(day));
		
		// Saving the itinerary
		itiRepo.save(itinerary);
	}
}
