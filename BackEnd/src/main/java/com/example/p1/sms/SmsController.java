package com.example.p1.sms;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.Gson;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@RestController
@CrossOrigin(origins = "*")
public class SmsController {
		//@Autowired private SMSApi s;

		@CrossOrigin(origins = "*")
        @PostMapping(value = "/sendSMS")
        public String sendSMS(@RequestBody String s) {
			//System.out.println(s);
        	//String Account="RmALcCzJDfSYK_L0znEgznD3R4OWzf9igqutxt4X";
			try {
				
				String a="";
				for(int i=0;i<6;i++) {
					a+=(int)(Math.random()*(9)+1);
				}
                Twilio.init("****************************", "*******************");

                Message.creator(new PhoneNumber(s),
                                new PhoneNumber("+18315766009"), "OTP for TALKTOYOU Application : "+a).create();

		

        		Gson gson = new Gson();    
                return gson.toJson(a);  
			}
			catch(Exception e) {
				//System.out.println("Errorn in twilio");
				System.out.println(e);

				Gson gson = new Gson();    
		        return gson.toJson("Error while sending sms");  
			}
        }
}
