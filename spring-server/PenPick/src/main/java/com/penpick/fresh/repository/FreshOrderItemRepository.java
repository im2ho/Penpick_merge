package com.penpick.fresh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.penpick.fresh.model.FreshOrderItem;

public interface FreshOrderItemRepository extends JpaRepository<FreshOrderItem, Long>{

}
