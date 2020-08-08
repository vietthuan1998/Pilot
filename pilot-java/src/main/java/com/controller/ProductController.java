package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.entity.ProductEntity;
import com.service.ProductService;
import com.test.Constrains;
import com.test.PageModel;
import com.test.SearchModel;

@CrossOrigin
@RestController
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	ProductService productService;
	
	@GetMapping(value = "/get-all-product")
	public List<ProductEntity> getAllProducts(){
		return productService.getAllProducts();
	}
	
	@PostMapping(value = "/get-products", params = { "page" })
	public PageModel<ProductEntity> getProductsByPageable(@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestBody SearchModel searchModel) {
		System.out.println("SEARCH");
		System.out.println(searchModel.getBrandName());
		return productService.getProductsByPageable(searchModel, PageRequest.of(page, Constrains.PAGE_SIZE), page);
	}
	
	@PostMapping(value = "/insert-product")
	public void insertProduct(@RequestBody ProductEntity productEntity) {
		System.out.println("CHECK INSERT");
		productService.insertOrUpdate(productEntity);
	}

	@PutMapping(value = "/update-product")
	public void updateProduct(@RequestBody ProductEntity productEntity) {
		System.out.println("CHECK UPDATE");
		productService.insertOrUpdate(productEntity);
	}

	@DeleteMapping(value = "/delete-product/{id}")
	public void deleteProduct(@PathVariable("id") int id) {
		System.out.println("Test DELETE");
		productService.delete(id);
		
	}
	
	@GetMapping(value = "/find-product-by-id/{id}")
	public ProductEntity findProductById(@PathVariable("id") int id) {
		return productService.findProductById(id);
	}
}
