package com.penpick.pension.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.penpick.pension.model.Pensions;


public interface PensionRepository extends JpaRepository<Pensions, Long>{
	
//	//펜션이름 검색
//	List<Pensions> findByName1(String name);
//	
//	//	지역 검색
//	List<Pensions> findByAddressContaining(String address);
	
	//통합 검색
	 @Query("SELECT p FROM Pensions p WHERE p.name LIKE %:term% OR p.address LIKE %:term% ")
	 List<Pensions> findByNameOrAddressContaining(@Param("term") String term);
	 
	//필터링 검색
	 @Query("SELECT p FROM Pensions p WHERE p.name LIKE %:term% OR p.address LIKE %:term% or p.sauna =%:filter%")
	List<Pensions> findByNameContaining(@Param("term") String term, @Param("filter")String filter);
	 

	 //======================================서광원 것=========================================
	 Pensions findPensionById(Long id);
	 
	 
	 //======================================서동재 것=========================================
	 Pensions getPensionsById(Long id); 

}