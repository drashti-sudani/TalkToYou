package com.example.p1.Userdata;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
	@Autowired
	UserService ur;
	///add USER
	@CrossOrigin(origins = "*")
	@PostMapping("/user")
	public ResponseEntity<User> addUser(@RequestBody User u){
		System.out.println("okk");
		User r=null;
		try {
			r=this.ur.addUser(u);
			System.out.println(r);
			return ResponseEntity.status(HttpStatus.CREATED).build();
		}
		catch(Exception e){
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY).build();
		}
	}
	
	
	
	//check register
	@CrossOrigin(origins = "*")
	@PostMapping("/check")
	public boolean check(@RequestBody String l){
		//System.out.println(l.substring(0,l.lastIndexOf(' '))+l.substring(l.lastIndexOf(' ')+1));
		Connection c;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
			PreparedStatement stmt=c.prepareStatement("select * from user where ragistrationtype=? and register=?;");
			stmt.setString(1, l.substring(0,l.lastIndexOf(' ')));
			stmt.setString(2, l.substring(l.lastIndexOf(' ')+1));
			ResultSet r=stmt.executeQuery();
			return !r.next();
			//Statement s1=c.createStatement();			
			}
		catch(Exception e) {
			System.out.println(e);
			return false;
		}
	}
	
	
	//check Id
	@CrossOrigin(origins = "*")
	@PostMapping("/checkId")
	public boolean checkId(@RequestBody String l){
		//System.out.println(l.substring(0,l.lastIndexOf(' '))+l.substring(l.lastIndexOf(' ')+1));
		Connection c;
		System.out.println(l+" "+l.length());
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
			PreparedStatement stmt=c.prepareStatement("select * from user where userid=?");
			stmt.setString(1, l);
			ResultSet r=stmt.executeQuery();
			return !r.next();
			//Statement s1=c.createStatement();			
			}
		catch(Exception e) {
			System.out.println(e);
			return false;
		}
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("/translate")
	public String reanslate(@RequestBody String l){
		Gson gson = new Gson(); 
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://google-translate1.p.rapidapi.com/language/translate/v2"))
				.header("content-type", "application/x-www-form-urlencoded")
				.header("Accept-Encoding", "application/gzip")
				//.header("X-RapidAPI-Key", "475d36df56msh0c5558208fc58f7p1c9904jsn489bddc3eca9")
				.header("X-RapidAPI-Key", "78d003de60msh353f751b31262d3p1bde5fjsn6c86843d53c0")
				.header("X-RapidAPI-Host", "google-translate1.p.rapidapi.com")
				.method("POST", HttpRequest.BodyPublishers.ofString(l))
				.build();
		try {
				HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
				System.out.print(response.body());
				return gson.toJson(response.body().toString().substring(44,response.body().toString().length()-5));
		}catch(Exception e) {
			return gson.toJson("Error");
		}
	}
	
	
}
