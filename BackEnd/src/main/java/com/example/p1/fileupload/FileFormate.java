package com.example.p1.fileupload;

public class FileFormate {
	String sender,receiver,filelink,filename;

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	public String getFilelink() {
		return filelink;
	}

	public void setFilelink(String filelink) {
		this.filelink = filelink;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public FileFormate(String sender, String receiver, String filelink, String filename) {
		super();
		this.sender = sender;
		this.receiver = receiver;
		this.filelink = filelink;
		this.filename = filename;
	}

	public FileFormate() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "FileFormate [sender=" + sender + ", receiver=" + receiver + ", filelink=" + filelink + ", filename="
				+ filename + "]";
	}
	
}
