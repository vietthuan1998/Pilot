package com.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dao.BrandDAO;
import com.entity.BrandEntity;
import com.repository.BrandRepository;
import com.test.PageModel;

@Repository("brandDAO")
@Transactional
public class BrandDAOImpl implements BrandDAO {
	
	@Autowired
	private BrandRepository brandRepository;
	
	@Autowired
	private EntityManager em;

	@Override
	public void insertOrUpdate(BrandEntity entity) {
		// TODO Auto-generated method stub
		brandRepository.save(entity);
	}

	@Override
	public void delete(BrandEntity entity) {
		// TODO Auto-generated method stub
		brandRepository.delete(entity);
	}

	@Override
	public BrandEntity findByName(String name) {
		// TODO Auto-generated method stub
		return brandRepository.findByBrandName(name);
	}

	@Override
	public List<String> getAllBrandName() {
		// TODO Auto-generated method stub
		return brandRepository.getAllBrandName();
	}

	@Override
	public List<BrandEntity> getBrands() {
		// TODO Auto-generated method stub
		return brandRepository.findAll();
	}

	@Override
	public BrandEntity findById(int Id) {
		// TODO Auto-generated method stub
		return brandRepository.findById(Id);
	}

	@Override
	public PageModel<BrandEntity> getBrandsByPageable(String brandName, Pageable pageable, int currentPage) {
		// TODO Auto-generated method stub
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<BrandEntity> cq = cb.createQuery(BrandEntity.class);
		Root<BrandEntity> brand = cq.from(BrandEntity.class);
		cq.select(brand);
		Order sortId = cb.desc(brand.get("brandId"));
		cq.orderBy(sortId);
		
		// Condition if searching by brand name
		if (brandName != "") {
			Predicate name = cb.like(brand.get("brandName"), "%" + brandName + "%");
			cq.where(name);
		}

		TypedQuery<BrandEntity> query = em.createQuery(cq);

		// Set pageable
		int totalPage = (query.getResultList().size() - 1) / pageable.getPageSize() + 1;
		query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
		query.setMaxResults(pageable.getPageSize());

		PageModel<BrandEntity> result = new PageModel<BrandEntity>(query.getResultList(), pageable, totalPage, currentPage);

		return result;
	}
	

}
