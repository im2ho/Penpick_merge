package com.penpick.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.penpick.users.model.Users;

public interface PenpickUserRepository extends JpaRepository<Users,Long>{
	
	
	Users findByUserEmail(String email);
	
	Users getUserByUserEmail(String email);
}
