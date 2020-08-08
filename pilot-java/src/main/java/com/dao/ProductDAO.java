package com.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.entity.ProductEntity;
import com.test.PageModel;
import com.test.SearchModel;

public interface ProductDAO extends GenericDAO<ProductEntity, Integer> {
	
	List<ProductEntity> getAllProducts();
	
	PageModel<ProductEntity> getProductsByPageable(SearchModel searchModel, Pageable pageable, int currentPage);

}
