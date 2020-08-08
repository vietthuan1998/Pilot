/**
 * 
 */
package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.entity.UserEntity;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<UserEntity, String> {

	@Query("SELECT us FROM UserEntity us where us.userName = ?1")
	UserEntity findUserByName(String userName);
}
