package com.example.p1;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailApi {
	 @Autowired private JavaMailSender javaMailSender;
	 
	 @Value("${spring.mail.username}") private String sender;
	 public String sendSimpleMail(EmailDetails details)
	    {
	 
	        // Try block to check for exceptions
	        try {
	 
	            // Creating a simple mail message
	            SimpleMailMessage mailMessage
	                = new SimpleMailMessage();
	 
	            // Setting up necessary details
	            mailMessage.setFrom(sender);
	            mailMessage.setTo(details.getRecipient());
	            
	            mailMessage.setText(details.getMsgBody());
	            mailMessage.setSubject(details.getSubject());
	 
	            // Sending the mail
	            javaMailSender.send(mailMessage);
	            return ""+details.getMsgBody();
	        }
	 
	        // Catch block to handle the exceptions
	        catch (Exception e) {
	        	System.out.print(e);
	            return "Error while Sending Mail";
	        }
	    }

}
