package com.example.p1.Userdata;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
@RestController
@CrossOrigin(origins = "*")
public class LogInController {
	//Log In
		@CrossOrigin(origins = "*")
		@PostMapping("/login")
		public String logIn(@RequestBody String l){
			//System.out.println(l.substring(0,l.lastIndexOf(' '))+l.substring(l.lastIndexOf(' ')+1));
			Connection c;
			//System.out.println(l+" "+l.length());
			Gson gson = new Gson();    
			try {
				System.out.println(l);
				Class.forName("com.mysql.cj.jdbc.Driver");
				c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
				if(l.charAt(0)=='1') {
					PreparedStatement stmt=c.prepareStatement("select password from user where userid=?;");
					stmt.setString(1, l.substring(1,l.lastIndexOf(' ')));
					ResultSet r=stmt.executeQuery();
					if(!r.next()) {
						return gson.toJson("User Id dosen't exist");
					}
					if(r!=null && r.getString(1).equals(l.substring(l.lastIndexOf(' ')+1))) {
						return gson.toJson("ok"+l.substring(1,l.lastIndexOf(' ')));
					}
					return gson.toJson("Incorrect password");
				}
				else {
					PreparedStatement stmt=c.prepareStatement("select password,userId from user where register=?;");
					stmt.setString(1, l.substring(1,l.lastIndexOf(' ')));
					ResultSet r=stmt.executeQuery();
					if(!r.next()) {
						if(l.charAt(0)=='2') {return gson.toJson("Mobile Numebr dosen't exist");}
						return gson.toJson("Email Id dosen't exist");
					}
					if(r!=null && r.getString(1).equals(l.substring(l.lastIndexOf(' ')+1))) {
						return gson.toJson("ok"+r.getString(2));
					}
					return gson.toJson("Incorrect password");
				}
				//Statement s1=c.createStatement();			
				}
			catch(Exception e) {
				System.out.println(e);
				return gson.toJson("Error while fetching data please try again");
			}
		}
		
		
		
		
		//Forget password OTP
		@CrossOrigin(origins = "*")
		@PostMapping("/OTP")
		public String ForgetPassword(@RequestBody String l){
			//System.out.println(l.substring(0,l.lastIndexOf(' '))+l.substring(l.lastIndexOf(' ')+1));
			Connection c;
			//System.out.println(l+" "+l.length());
			Gson gson = new Gson();    
			try {
				//System.out.println(l);
				Class.forName("com.mysql.cj.jdbc.Driver");
				//System.out.println("Before try 1");
				c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
				//System.out.println("Before try 2");
				if(l.charAt(0)=='1') {
					PreparedStatement stmt=c.prepareStatement("select ragistrationtype,register from user where userid=?;");
					//System.out.println(1);
					stmt.setString(1, l.substring(1));
					//System.out.println(2);
					ResultSet r=stmt.executeQuery();
					//System.out.println(3);
					if(!r.next()) {
						return gson.toJson("User Id dosen't exist");
					}
					return gson.toJson("ok"+r.getString(1)+" "+r.getString(2));
				}
				else {
					PreparedStatement stmt=c.prepareStatement("select userId from user where register=?;");
					stmt.setString(1, l.substring(1));
					ResultSet r=stmt.executeQuery();
					if(!r.next()) {
						if(l.charAt(0)=='2') {return gson.toJson("Mobile Numebr dosen't exist");}
						return gson.toJson("Email Id dosen't exist");
					}
					return gson.toJson("ok"+r.getString(1));
				}
				}
			catch(Exception e) {
				System.out.println(e);
				return gson.toJson("Error while fetching data please try again");
			}
			
		}
		
		
		
		
		//update password
		@CrossOrigin(origins = "*")
		@PostMapping("/updatepassword")
		public String UpdatePassword(@RequestBody String l){
			//System.out.println(l.substring(0,l.lastIndexOf(' '))+l.substring(l.lastIndexOf(' ')+1));
			Connection c;
			//System.out.println(l+" "+l.length());
			Gson gson = new Gson();    
			try {
				//System.out.println(l);
				Class.forName("com.mysql.cj.jdbc.Driver");
				//System.out.println("Before try 1");
				c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
					PreparedStatement stmt=c.prepareStatement("update user set password=? where userid=?;");
					stmt.setString(1, l.substring(l.indexOf(' ')+1));
					stmt.setString(2, l.substring(0,l.indexOf(' ')));
					System.out.println(stmt.executeUpdate());
					return gson.toJson("ok");
				
				}
			catch(Exception e) {
				System.out.println(e);
				return gson.toJson("Error while fetching data please try again");
			}
			
		}
		
		
}
