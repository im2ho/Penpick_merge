package com.penpick.fresh.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.penpick.fresh.model.FreshOrderItem;
import com.penpick.fresh.repository.FreshOrderItemRepository;
@Service
public class FreshOrderItemService {
	
	@Autowired
	private FreshOrderItemRepository freshorderitemRepository;
	
	public List<FreshOrderItem> getAllFreshOrderItem() {
		return freshorderitemRepository.findAll();
	}
	
	public Optional<FreshOrderItem> getOrderItems(Long res_num) {
		return freshorderitemRepository.findById(res_num);
	}
	
	public void saveFreshOrderItem(FreshOrderItem freshorderitem) {
		freshorderitemRepository.save(freshorderitem);
	}
	
	public void deleteFreshOrderItem(FreshOrderItem freshorderitem) {
		freshorderitemRepository.delete(freshorderitem);
	}
	
	public void deleteAllFreshOrderItem(FreshOrderItem freshorderitem) {
		freshorderitemRepository.deleteAll();
	}
	
}
