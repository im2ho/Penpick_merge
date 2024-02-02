package com.penpick.event.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.penpick.event.model.EventPage;

public interface EventRepository extends JpaRepository<EventPage,Long>{

	String deleteById(int id);
	
	List<EventPage> findByContent(String contents);

}
