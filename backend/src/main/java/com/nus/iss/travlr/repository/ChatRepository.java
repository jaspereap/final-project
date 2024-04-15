package com.nus.iss.travlr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nus.iss.travlr.models.Chat.ChatMessage;

@Repository
public interface ChatRepository extends JpaRepository<ChatMessage, Long>{
    List<ChatMessage> findAllByTripId(String tripId);
}
