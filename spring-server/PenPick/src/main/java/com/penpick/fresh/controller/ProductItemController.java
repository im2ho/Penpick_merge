package com.penpick.fresh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.fresh.model.ProductItem;
import com.penpick.fresh.service.ProductItemService;

@RestController
@RequestMapping("/productItem")

public class ProductItemController {
	
	@Autowired
	private ProductItemService productitemService;
	
	@GetMapping
	public String ProductItemList() {
		return "redirect:/productitem.list";
	}
	
	@GetMapping("/list")
	public ResponseEntity<List<ProductItem>> getAllProductItem() {
		List<ProductItem> productList = null;
		try {
			productList = productitemService.getAllProducts();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(productList);
	}
	
	@PostMapping("/add")
	public ResponseEntity<Void> registerProductItem(@RequestBody ProductItem productitem){
		productitemService.saveProductItem(productitem);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}