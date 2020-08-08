package com.dao;

import java.io.Serializable;

public interface GenericDAO<T, K extends Serializable> {
	
	void insertOrUpdate(T entity);
	
	void delete(T entity);
	
	T findByName(String name);

	T findById(int Id);
	
}
