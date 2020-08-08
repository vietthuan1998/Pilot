package com.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dao.ProductDAO;
import com.entity.BrandEntity;
import com.entity.ProductEntity;
import com.repository.ProductRepository;
import com.test.PageModel;
import com.test.SearchModel;

@Repository("productDAO")
@Transactional
public class ProductDAOImpl implements ProductDAO {
	
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	private EntityManager em;

	@Override
	public void insertOrUpdate(ProductEntity entity) {
		// TODO Auto-generated method stub
		productRepository.save(entity);
	}

	@Override
	public void delete(ProductEntity entity) {
		// TODO Auto-generated method stub
		productRepository.delete(entity);
	}

	@Override
	public ProductEntity findByName(String name) {
		// TODO Auto-generated method stub
		return productRepository.findByProductName(name);
	}

	@Override
	public List<ProductEntity> getAllProducts() {
		// TODO Auto-generated method stub
		return productRepository.findAll();
	}

	@Override
	public ProductEntity findById(int Id) {
		// TODO Auto-generated method stub
		return productRepository.findByProductId(Id);
	}

	@Override
	public PageModel<ProductEntity> getProductsByPageable(SearchModel searchModel, Pageable pageable, int currentPage) {
		// TODO Auto-generated method stub
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<ProductEntity> cq = cb.createQuery(ProductEntity.class);
		Root<BrandEntity> brand = cq.from(BrandEntity.class);
		Join<BrandEntity, ProductEntity> product = brand.join("productSet");
		cq.select(product);
		Order sortId = cb.desc(product.get("productId"));
		cq.orderBy(sortId);

		// Set condition
		setConditionSearchProducts(searchModel, cb, cq, brand, product);

		TypedQuery<ProductEntity> query = em.createQuery(cq);

		// Set pageable
		int totalPage = (query.getResultList().size() - 1) / pageable.getPageSize() + 1;
		query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
		query.setMaxResults(pageable.getPageSize());

		PageModel<ProductEntity> pageModel = new PageModel<ProductEntity>(query.getResultList(), pageable, totalPage, currentPage);

		return pageModel;
	}
	
	private void setConditionSearchProducts(SearchModel searchModel, CriteriaBuilder cb, CriteriaQuery<ProductEntity> cq,
			Root<BrandEntity> brand, Join<BrandEntity, ProductEntity> product) {

		// List condition
		List<Predicate> predicates = new ArrayList<Predicate>();

		// Sort order if search by price
		Order sortPrice = cb.desc(product.get("price"));

		// Condition if searching by product name
		if (searchModel.getProductName() != "") {
			Predicate productNameCondition = cb.like(product.get("productName"),
					"%" + searchModel.getProductName() + "%");
			predicates.add(productNameCondition);
		}

		// Condition if searching by brand name
		if (searchModel.getBrandName() != "") {
			Predicate brandNameCondition = cb.like(brand.get("brandName"), searchModel.getBrandName());
			predicates.add(brandNameCondition);
		}

		// Condition if searching by min price
		if (searchModel.getPriceFrom() != 0 && searchModel.getPriceTo() == 0) {
			Predicate priceFromCondition = cb.ge(product.get("price"), searchModel.getPriceFrom());
			predicates.add(priceFromCondition);
			cq.orderBy(sortPrice);
		}

		// Condition if searching by max price
		if (searchModel.getPriceFrom() == 0 && searchModel.getPriceTo() != 0) {
			Predicate priceToCondition = cb.le(product.get("price"), searchModel.getPriceTo());
			predicates.add(priceToCondition);
			cq.orderBy(sortPrice);
		}

		// Condition if searching from min price to max price
		if (searchModel.getPriceFrom() != 0 && searchModel.getPriceTo() != 0) {
			Predicate priceCondition = cb.between(product.get("price"), searchModel.getPriceFrom(),
					searchModel.getPriceTo());
			predicates.add(priceCondition);
			cq.orderBy(sortPrice);
		}

		cq.where(predicates.toArray(new Predicate[] {}));
	}

}
