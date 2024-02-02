package com.penpick.fresh.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.penpick.fresh.model.ProductItem;
import com.penpick.fresh.repository.ProductItemRepository;

@Service
public class ProductItemService {
	@Autowired
	private ProductItemRepository productitemRepository;
	
	public List<ProductItem> getAllProducts() {
		return productitemRepository.findAll();
	}
	
	public Optional<ProductItem> getProduct(Long item_num) {
		return productitemRepository.findById(item_num);
	}
	
	//물품을 직접 넣어야 할 수도 있음
	public void saveProductItem(ProductItem productitem) {
		productitemRepository.save(productitem);
	}
}
