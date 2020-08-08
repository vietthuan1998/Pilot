package com.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.dao.ProductDAO;
import com.entity.ProductEntity;
import com.service.ProductService;
import com.test.PageModel;
import com.test.SearchModel;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	ProductDAO productDAO;

	@Override
	public ProductEntity findProductByName(String productName) {
		// TODO Auto-generated method stub
		return productDAO.findByName(productName);
	}

	@Override
	public List<ProductEntity> getAllProducts() {
		// TODO Auto-generated method stub
		return productDAO.getAllProducts();
	}

	@Override
	public PageModel<ProductEntity> getProductsByPageable(SearchModel searchModel, Pageable pageable, int currentPage) {
		// TODO Auto-generated method stub
		return productDAO.getProductsByPageable(searchModel, pageable, currentPage);
	}

	@Override
	public void insertOrUpdate(ProductEntity productEntity) {
		// TODO Auto-generated method stub
		productDAO.insertOrUpdate(productEntity);
	}

	@Override
	public void delete(int productId) {
		// TODO Auto-generated method stub
		productDAO.delete(findProductById(productId));
	}

	@Override
	public ProductEntity findProductById(int productId) {
		// TODO Auto-generated method stub
		return productDAO.findById(productId);
	}

}
