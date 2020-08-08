package com.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.entity.BrandEntity;
import com.test.PageModel;

public interface BrandService {
	
	public void insertOrUpdate(BrandEntity brandEntity);
	
	public void delete(int brandId);
	
//	public void delete(BrandEntity brandEntity);

	BrandEntity findBrandByName(String brandName);
	
	BrandEntity findBrandById(int Id);

	List<String> getAllBrandName();

	List<BrandEntity> getBrands();
	
	PageModel<BrandEntity> getBrandsByPageable(String brandName, Pageable pageable, int currentPage);

}
