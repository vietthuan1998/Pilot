package com.dao;

import com.entity.UserEntity;

public interface UserDAO {

	UserEntity findUserByName(String userName);
	
}
