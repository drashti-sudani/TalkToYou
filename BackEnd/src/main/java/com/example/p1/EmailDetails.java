package com.example.p1;


 
// Class
public class EmailDetails {
 
    // Class data members
    private String recipient;
    
	private String msgBody;
    private String subject;
    private String attachment;
    public EmailDetails() {
		super();
		this.recipient = "";
		this.msgBody = "";
		this.subject = "";
		this.attachment = "";
		//System.out.println("In c1");
		int a=0;
		for(int i=0;i<6;i++) {
			a=a*10+(int)(Math.random()*(9-1+1)+1);  
		}
		this.msgBody = a+"";
		this.subject = "YOUR OTP FOR TALKTOYOU APPLICATION";
	}
    public EmailDetails(String recipient) {
		super();
    	//System.out.println("In c2");
		this.recipient = recipient;
		int a=0;
		for(int i=0;i<6;i++) {
			a=a*10+(int)(Math.random()*(9-1+1)+1);  
		}
		this.msgBody = a+"";
		this.subject = "YOUR OTP FOR TALKTOYOU APLLICATION";
	}
    
    
    
	public String getRecipient() {
		return recipient;
	}
	public void setRecipient(String recipient) {
		//System.out.println("In getter");
		this.recipient = recipient;
	}
	@Override
	public String toString() {
		return "EmailDetails [recipient=" + recipient + ", msgBody=" + msgBody + ", subject=" + subject
				+ ", attachment=" + attachment + "]";
	}
	public String getMsgBody() {
		return msgBody;
	}
	public void setMsgBody(String msgBody) {
		this.msgBody = msgBody;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getAttachment() {
		return attachment;
	}
	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}
    
}