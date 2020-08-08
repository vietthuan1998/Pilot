package com.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.dao.BrandDAO;
import com.entity.BrandEntity;
import com.service.BrandService;
import com.test.PageModel;

@Service
public class BrandServiceImpl implements BrandService {
	
	@Autowired
	BrandDAO brandDAO;

	@Override
	public BrandEntity findBrandByName(String brandName) {
		// TODO Auto-generated method stub
		return brandDAO.findByName(brandName);
	}

	@Override
	public List<String> getAllBrandName() {
		// TODO Auto-generated method stub
		return brandDAO.getAllBrandName();
	}

	@Override
	public List<BrandEntity> getBrands() {
		// TODO Auto-generated method stub
		return brandDAO.getBrands();
	}

	@Override
	public void insertOrUpdate(BrandEntity brandEntity) {
		// TODO Auto-generated method stub
		brandDAO.insertOrUpdate(brandEntity);;
	}

//	@Override
//	public void delete(BrandEntity brandEntity) {
//		// TODO Auto-generated method stub
//		brandDAO.delete(brandEntity);
//	}
	
	@Override
	public void delete(int brandId) {
		// TODO Auto-generated method stub
		brandDAO.delete(findBrandById(brandId));
	}

	@Override
	public BrandEntity findBrandById(int Id) {
		// TODO Auto-generated method stub
		return brandDAO.findById(Id);
	}

	@Override
	public PageModel<BrandEntity> getBrandsByPageable(String brandName, Pageable pageable, int currentPage) {
		// TODO Auto-generated method stub
		return brandDAO.getBrandsByPageable(brandName, pageable, currentPage);
	}

}
