package com.example.p1.editConnectons;

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
public class RequestController {
	@CrossOrigin(origins = "*")
	@PostMapping("/getRequest")
	public String getRequest(@RequestBody String l) {
		System.out.println(l);
		Gson gson = new Gson(); 
		Connection c;
		try {
			String re="[";
			Class.forName("com.mysql.cj.jdbc.Driver");
			c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
			
			PreparedStatement s2=c.prepareStatement("select * from request where receiver=?;");
			s2.setString(1, l);
			ResultSet r2=s2.executeQuery();
			while(r2.next()) {
				PreparedStatement stmt=c.prepareStatement("select * from user where userid=? ;");
				stmt.setString(1, r2.getString(1)); 
				ResultSet r=stmt.executeQuery();
				if(!r.next()) {
					continue;
				}
				re+="{\"avtar\":\""+r.getString(3)+"\",\"id\":\""+r.getString(1)+"\"";
				re+=",\"3User Name\":\""+r.getString(4)+"\"";
				re+=",\"4About\":\""+r.getString(5)+"\"";
				re+=",\"5Mobile Numer\":\""+r.getString(6)+"\"";
				re+=",\"6School Name\":\""+r.getString(7)+"\"";
				re+=",\"7Colleage Name\":\""+r.getString(8)+"\"";
				re+="},";
			}
			if(re.length()!=1) {
			re=re.substring(0,re.length()-1)+"]";
			}
			else {
				re+="]";
			}
			System.out.println(re);
			return gson.toJson(re);
		}
		catch(Exception e) {
			System.out.println(e);
			return gson.toJson("Error during fetching data");
		}
	}
	@CrossOrigin(origins = "*")
	@PostMapping("/confirmRequest")
	public String confirmRequest(@RequestBody String l) {
		System.out.println(l);
		Gson gson = new Gson(); 
		Connection c;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
			PreparedStatement stmt=c.prepareStatement("delete from request where sender=? and receiver=?;");
			stmt.setString(1, l.substring(0,l.indexOf(' '))); 
			stmt.setString(2, l.substring(l.indexOf(' ')+1)); 
			System.out.println(stmt.executeUpdate());
			stmt=c.prepareStatement("insert into connection values(?,?);");
			stmt.setString(1, l.substring(0,l.indexOf(' '))); 
			stmt.setString(2, l.substring(l.indexOf(' ')+1)); 
			System.out.println(stmt.executeUpdate());
			return gson.toJson("ok");
		}
		catch(Exception e) {
			System.out.println(e);
			return gson.toJson("Error during deleting data");
		}
	}
}
