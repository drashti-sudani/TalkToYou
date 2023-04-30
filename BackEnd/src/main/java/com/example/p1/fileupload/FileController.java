package com.example.p1.fileupload;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

@RestController
@CrossOrigin(origins = "*")
public class FileController {
	@CrossOrigin(origins = "*")
	@PostMapping("/sendfile")
	public String sendFile(@RequestBody FileFormate f) {
		System.out.println(f);
		Gson gson = new Gson(); 
		Connection c;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
			PreparedStatement stmt=c.prepareStatement("insert into message(sender,receiver, message,time,receive) values(?,?,?,?,false);");
			stmt.setString(1, f.sender);
			stmt.setString(2, f.receiver);
			stmt.setString(3, f.filelink);
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
			LocalDateTime now = LocalDateTime.now();  
			stmt.setString(4,dtf.format(now));  
			System.out.println("in send msg "+stmt.executeUpdate());
			return gson.toJson("ok");
		}
		catch(Exception e) {
			System.out.println(e);
			return gson.toJson("Error during fetching data");
		}
	}
}
