package com.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dao.UserDAO;
import com.entity.UserEntity;
import com.repository.UserRepository;

@Repository("userDAO")
@Transactional
public class UserDAOImpl implements UserDAO {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserEntity findUserByName(String userName) {
		// TODO Auto-generated method stub
		return userRepository.findUserByName(userName);
	}

}
