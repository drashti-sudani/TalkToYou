package com.example.p1;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;  

@RestController
@CrossOrigin(origins = "*")
public class EmailController {
	@Autowired public EmailApi emailService;
	 
    // Sending a simple Email
	@CrossOrigin(origins = "*")
    @PostMapping("/sendMail")
    public String
    sendMail(@RequestBody EmailDetails details)
    {
		System.out.println(details);
		String status
            =emailService.sendSimpleMail(details);

		Gson gson = new Gson();    
        return gson.toJson(status);  
    }
	
 
    
}
