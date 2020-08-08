package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.entity.ProductEntity;

@Repository("productRepository")
public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
	
	ProductEntity findByProductName(String productName);
	
	@Query("SELECT p FROM ProductEntity p where p.productId = ?1")
	ProductEntity findByProductId(int productId);

}
