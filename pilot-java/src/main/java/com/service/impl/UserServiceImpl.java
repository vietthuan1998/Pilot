package com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.UserDAO;
import com.entity.UserEntity;
import com.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserDAO userDAO;

	@Override
	public UserEntity findUserByName(String userName) {
		// TODO Auto-generated method stub
		return userDAO.findUserByName(userName);
	}

}
