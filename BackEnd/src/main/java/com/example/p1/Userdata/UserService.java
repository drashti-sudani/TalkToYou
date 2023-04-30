package com.example.p1.Userdata;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserService {
	@Autowired
	private UserRepository ur;
	public List<User> getUserById(){
		return (List<User>) this.ur.findAll();
	}
	public Optional<User> getUserById(String id) {
		Optional<User> u=null;
		try {
			u=this.ur.findById(id);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return u;
	}
	public User addUser(User u) {
		return ur.save(u);
	}
	public void deleteUser(String id) {
		ur.deleteById(id);
	}
	public void updateUser(User u,String id) {
		u.setUserid(id);
		ur.save(u);
	}
	public boolean check(String ragistrationtype, String register) {
		List<String> l= ur.check(ragistrationtype, register);
		System.out.println(l);
		return l.size()==1;
	}
}
