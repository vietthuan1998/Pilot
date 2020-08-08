package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.entity.BrandEntity;

@Repository("brandRepository")
public interface BrandRepository extends JpaRepository<BrandEntity, Integer> {
	
	BrandEntity findByBrandName(String brandName);
	
	@Query("SELECT b FROM BrandEntity b where b.brandId = ?1")
	BrandEntity findById(int Id);
	
	@Query("SELECT b.brandName FROM BrandEntity b")
	List<String> getAllBrandName();
	
	

}
