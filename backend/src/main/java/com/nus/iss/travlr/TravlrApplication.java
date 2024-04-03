package com.nus.iss.travlr;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.nus.iss.travlr.models.Costing;
import com.nus.iss.travlr.models.Day;
import com.nus.iss.travlr.models.Flight;
import com.nus.iss.travlr.models.Itinerary;
import com.nus.iss.travlr.models.Lodging;
import com.nus.iss.travlr.models.Place;
import com.nus.iss.travlr.models.Trip;
import com.nus.iss.travlr.repository.TripRepository;
import com.nus.iss.travlr.repository.UserRepository;
import com.nus.iss.travlr.service.GoogleSearchAPIService;
import com.nus.iss.travlr.service.TripService;
import com.nus.iss.travlr.service.UserService;

@SpringBootApplication
public class TravlrApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(TravlrApplication.class, args);
	}
	@Autowired UserRepository userRepo;
	@Autowired UserService userService;
	@Autowired TripRepository tripRepo;
	@Autowired TripService tripSvc;
	@Autowired GoogleSearchAPIService gSvc;

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

		// Trip trip = createTrip();
		// tripRepo.save(trip);
		// tripSvc.addTripMate("1", 33L);
		// Optional<Trip> optTrip = tripRepo.findById("1");
		// System.out.println("\tTrip: \n" + optTrip.get());
		// System.out.println(tripSvc.getAllTripsByUserId(4L));
		String image = gSvc.searchImage("thailand scenic");
		System.out.println("image: " + image);
	}
	private Date getDate(int year, int month, int day) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(year, month - 1, day, 0, 0); // Note: Months are 0-based
		return calendar.getTime();
	}
	public List<Lodging> createLodgings() {
		List<Costing> costings = new ArrayList<>();
		costings.add(new Costing(300.0f, "SGD"));
		Lodging lodging = new Lodging(
			"Marina Bay Sands", 
			"Luxury hotel with iconic infinity pool", 
			getDate(2023, 3, 10), // Check-in date
			getDate(2023, 3, 15), // Check-out date
			costings,
			"10 Bayfront Ave, Singapore 018956",
			new Float[]{1.2834f, 103.8607f} // Lat, Lng for Marina Bay Sands
		);
	
		return Arrays.asList(lodging);
	}

	public Itinerary createItinerary() {
		// Creating places
		List<Costing> costings1 = new ArrayList<>();
		costings1.add(new Costing(0f, "SGD")); // No cost for public landmarks
		Place place1 = new Place(
			1, 
			"Gardens by the Bay", 
			"image_url_gardens", 
			"A futuristic park with giant tree-like structures", 
			getDate(2023, 3, 11), 
			getDate(2023, 3, 11),
			costings1,
			"18 Marina Gardens Dr, Singapore 018953",
			new Float[]{1.2816f, 103.8636f});
	
		// Another place
		Place place2 = new Place(
			2, 
			"Singapore Flyer", 
			"image_url_flyer", 
			"Giant Ferris wheel offering panoramic views of the city", 
			getDate(2023, 3, 11), 
			getDate(2023, 3, 11),
			costings1,
			"30 Raffles Ave, Singapore 039803",
			new Float[]{1.2893f, 103.8632f});

		Place place3 = new Place(
			1, 
			"random", 
			"image_url_flyer", 
			"Giant Ferris wheel offering panoramic views of the city", 
			getDate(2023, 3, 12), 
			getDate(2023, 3, 12),
			costings1,
			"30 Raffles Ave, Singapore 039803",
			new Float[]{1.2893f, 103.8632f});
		
		// Creating a day
		Day day1 = new Day(getDate(2023, 3, 11), Arrays.asList(place1,place2));
		Day day2 = new Day(getDate(2023, 3, 12), Arrays.asList(place3));
		
		// Creating an itinerary
		Itinerary itinerary = new Itinerary("1", Arrays.asList(day1, day2));
		
		return itinerary;
	}

	public List<Flight> createFlightData() {
		List<Flight> flights = new ArrayList<>();
		List<Costing> costings1 = new ArrayList<>();
		costings1.add(new Costing(500.50f, "SGD"));
		Flight flight1 = new Flight(
			"Singapore Airlines",
			"SQ888",
			"Japan",
			"Singapore",
			getDate(2023, 3, 9), // Departure date
			getDate(2023, 3, 10), // Arrival date
			"Direct flight from Tokyo to Singapore",
			"image-url-flight1",
			costings1
		);
		
		return Arrays.asList(flight1);
	}

	public Trip createTrip() {
		// Assuming the trip starts with the flight arrival in Singapore
		// and ends with the lodging check-out date
		Date startDate = getDate(2023, 3, 10); // Flight arrival date
		Date endDate = getDate(2023, 3, 15);   // Lodging check-out date
	
		Trip trip = new Trip(
			"1",
			"Singapore",
			startDate,
			endDate,
			4L,
			new HashSet<>(Arrays.asList(1L, 2L)), // Example user IDs of trip mates
			createFlightData(),
			createLodgings(),
			createItinerary(),
			"image url here" // Ideally, use a relevant image URL
		);
		return trip;
	}
}
