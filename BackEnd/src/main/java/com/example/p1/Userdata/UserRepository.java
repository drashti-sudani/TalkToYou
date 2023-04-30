package com.example.p1.Userdata;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User,String>{
	public Optional<User> findById(String id);
	@Query("select u.userid from User u where u.ragistrationtype=:a and u.register=:b")
	public List<String> check(@Param("a") String ragistrationtype,@Param("b") String register);
}
