package com.service;

import com.entity.UserEntity;

public interface UserService {
	
	UserEntity findUserByName(String userName);

}
