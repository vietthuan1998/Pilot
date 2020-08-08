package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.UserEntity;
import com.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping(value = "/get-user/{username}")
	public UserEntity findUserByName(@PathVariable("username") String userName) {
		return userService.findUserByName(userName);
	}

}
