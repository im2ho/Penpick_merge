package com.penpick.qna.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.penpick.qna.model.Questions;

public interface QuestionRepository extends JpaRepository<Questions, Long> {
	
}