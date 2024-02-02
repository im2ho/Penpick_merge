package com.penpick.reservation.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.penpick.reservation.model.Reservation;
import com.penpick.users.model.Users;


public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByPenpickUser(Users penpickUser);
    
	@Query("SELECT r FROM Reservation r JOIN Users p ON r.phoneNumber = p.phoneNumber WHERE p.userEmail = :email")
    List<Reservation> findByEmail(@Param("email") String email);

    
//    List<Reservation> findByEmail(String email);
	
//	void makeReservation(String nickname, Long id, int quantity);
	
	
	
//	List<Reservation> getAllReservation();
}