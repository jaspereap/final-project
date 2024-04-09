package com.nus.iss.travlr.service;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class GoogleSearchAPIService {
    @Value("${google.api.key}") private String GOOGLE_API_KEY;
    @Value("${google.search.id}") private String GOOGLE_SEARCH_ID;
    private final String END_POINT = "https://www.googleapis.com/customsearch/v1";
    
    private RestTemplate template = new RestTemplate();
    
    public String searchImage(String query) {
        String url = UriComponentsBuilder
            .fromUriString(END_POINT)
            .queryParam("key", GOOGLE_API_KEY)
            .queryParam("cx", GOOGLE_SEARCH_ID)
            .queryParam("q", query)
            .build()
            .toString();
        System.out.println(url);

        RequestEntity<Void> req = RequestEntity.get(url).build();
        ResponseEntity<String> resp = template.exchange(req, String.class);
        if (resp.getStatusCode() != HttpStatusCode.valueOf(200)){
            System.out.println("Http call failed");
            return "";
        }
        String rawImage = resp.getBody();
        String image_url = extractImage(rawImage);
        return image_url;
    }

    private String extractImage(String resp) {
        JsonReader reader = Json.createReader(new StringReader(resp));
        JsonObject obj = reader.readObject();
        String image_url = obj.getJsonArray("items")
            .getJsonObject(0)
            .getJsonObject("pagemap")
            // .getJsonArray("imageobject")
            .getJsonArray("cse_image")
            .getJsonObject(0)
            // .getString("thumbnailurl")
            .getString("src")
            ;

        return image_url;
    }
}
