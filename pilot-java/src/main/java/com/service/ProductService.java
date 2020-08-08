package com.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.entity.ProductEntity;
import com.test.PageModel;
import com.test.SearchModel;

public interface ProductService {
	
	public void insertOrUpdate(ProductEntity productEntity);
	
	public void delete(int productId);
	
	ProductEntity findProductByName(String productName);
	
	ProductEntity findProductById(int productId);
	
	List<ProductEntity> getAllProducts();
	
	PageModel<ProductEntity> getProductsByPageable(SearchModel searchModel, Pageable pageable, int currentPage);

}
