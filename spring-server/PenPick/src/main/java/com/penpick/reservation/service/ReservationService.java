package com.penpick.reservation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.penpick.pension.model.Pensions;
import com.penpick.pension.service.PensionService;
import com.penpick.reservation.model.Reservation;
import com.penpick.reservation.repository.ReservationRepository;
import com.penpick.users.model.Users;


@Service
public class ReservationService{

    @Autowired
    private PenpickUserService penpickUserService;

    @Autowired
    private PensionService pensionService;

    @Autowired
    private ReservationRepository reservationRepository; 
    

    public void makeReservation(String email,String phoneNumber,int people/*,boolean pick*//*,String payment*/) {
//    	Pensions pensions = pensionsService.getPensionName(name);
    	Users penpickUser = penpickUserService.getUserByEmail(email);
       

        Reservation reservation = new Reservation();
//        reservation.setPenpickUser(penpickUser);
//        reservation.setPensions(pensions);
          reservation.setPhoneNumber(phoneNumber);
          reservation.setPeople(people);
//        reservation.setPick(pick);
//        reservation.setPayment(payment);

        reservationRepository.save(reservation);
    }

//    public List<Reservation> getUserReservations(String email) {
//    	Users penpickUser = penpickUserService.getUserByEmail(email);
//        return reservationRepository.findByPenpickUser(penpickUser);
//    }
    
    public List<Reservation> getAllReservation(){
    	return reservationRepository.findAll();
    }
    
    public Optional<Reservation> getReservation(Long id){
    	return reservationRepository.findById(id);
    }
    
    //이메일로 예약 조회
    public List<Reservation> getReservations(String email){
    	return reservationRepository.findByEmail(email);
    }

//    유저넘으로 조회
//    public List<Reservation> getReservation(int userNum){
//    	return reservationRepository.findByUserNum(userNum);
//    }
	
}