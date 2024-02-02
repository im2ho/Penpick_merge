package com.penpick.reservation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.penpick.reservation.repository.PenpickUserRepository;
import com.penpick.users.model.Users;

@Service
public class PenpickUserService{

	@Autowired
	private PenpickUserRepository penpickUserRepository;
	
	
	public Users getUserByEmail(String email) {
		return penpickUserRepository.findByUserEmail(email);
	}

}
