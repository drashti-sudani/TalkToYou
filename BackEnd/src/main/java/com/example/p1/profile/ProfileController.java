package com.example.p1.profile;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.p1.Userdata.User;
import com.google.gson.Gson;

@RestController
@CrossOrigin(origins = "*")
public class ProfileController {
	@CrossOrigin(origins = "*")
	@PostMapping("/getProfile")
	public String getProfile(@RequestBody String l) {
		System.out.println(l);
		Gson gson = new Gson(); 
		Connection c;
		try {
			String re="";
			Class.forName("com.mysql.cj.jdbc.Driver");
			c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
			PreparedStatement stmt=c.prepareStatement("select * from user where userid=?;");
			stmt.setString(1, l); 
			ResultSet r=stmt.executeQuery();
			if(!r.next()) {
				return gson.toJson(re);
			}
			System.out.println(r+" "+"In getprofile");
			re+="{\"1Avtar\":\""+r.getString(3)+"\",\"2User ID \":\""+r.getString(1)+"\"";
				re+=",\"3User Name\":\""+r.getString(4)+"\"";
				re+=",\"4About\":\""+r.getString(5)+"\"";
				re+=",\"5Mobile Numer\":\""+r.getString(6)+"\"";
				re+=",\"6School Name\":\""+r.getString(7)+"\"";
				re+=",\"7Colleage Name\":\""+r.getString(8)+"\"";
			re+='}';
			System.out.println(re);
			return gson.toJson(re);
		}
		catch(Exception e) {
			System.out.println(e+"in getprofile");
			return gson.toJson("Error during fetching data");
		}
	}
	@CrossOrigin(origins = "*")
	@PostMapping("/editProfile")
	public String editProfile(@RequestBody User u) {
		System.out.println(u+"In HII");
		Gson gson = new Gson(); 
		Connection c;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
			PreparedStatement stmt=c.prepareStatement("select ragistrationtype,register from user where userid=?;");
			//System.out.println(1);
			stmt.setString(1, u.getUserid()); 
			//System.out.println(2);
			ResultSet r=stmt.executeQuery();
			
			if(r.next() && r.getString(1).equals("mobilenumber") && !u.getMobilenumber().equals(r.getString(2))) {
				System.out.println(r.getString(1).equals("mobilenumber"));
				System.out.println(!u.getMobilenumber().equals(r.getString(2)));
				return gson.toJson("You can't update your mobilenumber");
			}
			System.out.println(r);
			stmt=c.prepareStatement("update user set  username=? ,about=?,mobilenumber=?,schoolname=?,colleagename=?,avtar=? where userid=?");
			stmt.setString(1, u.getUsername()); 
			stmt.setString(2, u.getAbout());
			stmt.setString(3, u.getMobilenumber());
			stmt.setString(4, u.getSchoolname());
			stmt.setString(5, u.getColleagename());
			stmt.setString(6, u.getAvtar());
			stmt.setString(7, u.getUserid());
			System.out.println(stmt.executeUpdate());
			
			//System.out.println(re);
			return gson.toJson("ok");
		}
		catch(Exception e) {
			System.out.println(e+"In editprofile");
			return gson.toJson("Error during fetching data");
		}
	}
}
