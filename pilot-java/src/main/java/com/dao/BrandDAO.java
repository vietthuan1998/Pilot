package com.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.entity.BrandEntity;
import com.test.PageModel;

public interface BrandDAO extends GenericDAO<BrandEntity, Integer> {

	List<String> getAllBrandName();

	List<BrandEntity> getBrands();
	
	PageModel<BrandEntity> getBrandsByPageable(String brandName, Pageable pageable, int currentPage);

}
