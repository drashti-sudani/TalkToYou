package com.example.p1.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

@RestController
@CrossOrigin(origins = "*")
public class ConnectionControl {
	//take userid and gives it's connection and notification
	@CrossOrigin(origins = "*")
	@PostMapping("/getconnection")
	public String getConnection(@RequestBody String l) {
		Gson gson = new Gson(); 
		Connection c;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
			PreparedStatement stmt=c.prepareStatement("select case when user1=? then user2 when user2=? then user1 end from connection where user1=? or user2=? ;");
			stmt.setString(1, l);
			stmt.setString(2,l);
			stmt.setString(3, l);
			stmt.setString(4, l);
			List<String> connection=new ArrayList<>();
			ResultSet r=stmt.executeQuery();
			while(r.next()) {
				stmt=c.prepareStatement("select avtar from user where userid=?;");
				stmt.setString(1,r.getString(1));
				ResultSet r1=stmt.executeQuery();
				String s="{\"iid\":\""+r.getString(1)+"\",\"aavtar\":\"";
				r1.next();
				if(r1.getString(1).length()==0) {
					s+="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q1-Q-J3UxEu-l7X7GwlTbGgImYcKXnnUul4By5_UPg&s"+"\"";
				}
				else {
					s+=r1.getString(1)+"\"";
				}
				stmt=c.prepareStatement("select count(*) from message where receiver=? and sender=? and receive=false;");
				stmt.setString(1,l);
				stmt.setString(2,r.getString(1));
				r1=stmt.executeQuery();
				r1.next();
				s+=",\"Notification\":"+r1.getInt(1)+"}";
				connection.add(s);
			}
			String re="[";
			for(int i=0;i<connection.size()-1;i++) {
				re+=connection.get(i)+",";
			}
			if(connection.size()!=0) {
				re+=connection.get(connection.size()-1);
			}
			re+="]";
			//Statement s1=c.createStatement();	
			System.out.println(re);
			return gson.toJson(re);
			}
		catch(Exception e) {
			System.out.println(e);
			return gson.toJson("Error during fetching data");
		}
		   
		
	}
	
	
	//take userid and give avtar
	@CrossOrigin(origins = "*")
	@PostMapping("/getavtar")
	public String getAvtar(@RequestBody String l) {
		Gson gson = new Gson(); 
		Connection c;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
			PreparedStatement stmt=c.prepareStatement("select avtar from user where userid=?;");
			stmt.setString(1, l);
			ResultSet r=stmt.executeQuery();
			r.next();
			return gson.toJson(r.getString(1));
			
			}
		catch(Exception e) {
			System.out.println(e);
			return gson.toJson("Error during fetching data");
		}
	}
	
	
	//take useridloged +" "+another userid and give avtar
		@CrossOrigin(origins = "*")
		@PostMapping("/getmessage")
		public String getgetMessage(@RequestBody String l) {
			Gson gson = new Gson(); 
			Connection c;
			try {
				String sender=l.substring(0,l.indexOf(' '));
				String receiver=l.substring(l.indexOf(' ')+1);
				Class.forName("com.mysql.cj.jdbc.Driver");
				c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
				PreparedStatement stmt=c.prepareStatement("select * from message where (sender=? and receiver=?) OR (receiver=? and sender=?) order by time asc");
				stmt.setString(1, sender);
				stmt.setString(2, receiver);
				stmt.setString(3, sender);
				stmt.setString(4, receiver);
				ResultSet r=stmt.executeQuery();
				List<String> chat=new ArrayList<>();
				while(r.next()) {
					if(r.getString(2).equals(sender)) {
						chat.add('s'+r.getString(4));
					}
					else {chat.add('r'+r.getString(4));}
				}
				String re="[";
				for(int i=0;i<chat.size()-1;i++) {
					re+="\""+chat.get(i)+"\",";
				}
				if(chat.size()!=0) {
					re+="\""+chat.get(chat.size()-1)+"\"]";
				}
				else {
					re+=']';
				}
				return gson.toJson(re);
				}
			catch(Exception e) {
				System.out.println(e);
				return gson.toJson("Error during fetching data");
			}
		}
		
		
		
		
		//take receive and sender and set receive=true; 
		@CrossOrigin(origins = "*")
		@PostMapping("/resetnotification")
		public String resetNotification(@RequestBody String l) {
			Gson gson = new Gson(); 
			Connection c;
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
				PreparedStatement stmt=c.prepareStatement("update message set receive=true where receiver=? and sender=?;");
				stmt.setString(1, l.substring(0,l.indexOf(' ')));
				stmt.setString(2, l.substring(l.indexOf(' ')+1));
				System.out.println("In resetnotification "+stmt.executeUpdate());
				return gson.toJson("ok");
			}
			catch(Exception e) {
				System.out.println(e);
				return gson.toJson("Error during fetching data");
			}
		}
		
		
		
		//take sender and receiver and message and add in message  
		@CrossOrigin(origins = "*")
		@PostMapping("/sendmessage")
		public String sendMSg(@RequestBody String l) {
			System.out.println(l);
			Gson gson = new Gson(); 
			Connection c;
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				c = DriverManager.getConnection("jdbc:mysql://localhost:3306/talktoyou", "root", "MySql@123");
				PreparedStatement stmt=c.prepareStatement("insert into message(sender,receiver, message,time,receive) values(?,?,?,?,false);");
				stmt.setString(1, l.substring(0,l.indexOf(' ')));
				stmt.setString(2, l.substring(l.indexOf(' ')+1,l.lastIndexOf(' ')));
				stmt.setString(3, l.substring(l.lastIndexOf(' ')+1));
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
