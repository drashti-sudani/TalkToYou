package com.example.p1.Userdata;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user")
public class User {
	@Override
	public String toString() {
		return "User [userid=" + userid + ", password=" + password + ", avtar=" + avtar + ", username=" + username
				+ ", about=" + about + ", mobilenumber=" + mobilenumber + ", schoolname=" + schoolname
				+ ", colleagename=" + colleagename + ", ragistrationtype=" + ragistrationtype + ", register=" + register
				+ "]";
	}
	@Id
	private String userid;
    private String password;
    private String avtar;
    private String username;
    private String about ;
    private String mobilenumber;
    private String schoolname;
    private String colleagename;
    private String ragistrationtype;
	private String register ;
	public User(String userid, String password, String avtar, String username, String about, String mobilenumber,
			String schoolname, String colleagename, String ragistrationtype, String register) {
		super();
		this.userid = userid;
		this.password = password;
		this.avtar = avtar;
		this.username = username;
		this.about = about;
		this.mobilenumber = mobilenumber;
		this.schoolname = schoolname;
		this.colleagename = colleagename;
		this.ragistrationtype = ragistrationtype;
		this.register = register;
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAvtar() {
		return avtar;
	}
	public void setAvtar(String avtar) {
		this.avtar = avtar;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getAbout() {
		return about;
	}
	public void setAbout(String about) {
		this.about = about;
	}
	public String getMobilenumber() {
		return mobilenumber;
	}
	public void setMobilenumber(String mobilenumber) {
		this.mobilenumber = mobilenumber;
	}
	public String getSchoolname() {
		return schoolname;
	}
	public void setSchoolname(String schoolname) {
		this.schoolname = schoolname;
	}
	public String getColleagename() {
		return colleagename;
	}
	public void setColleagename(String colleagename) {
		this.colleagename = colleagename;
	}
	public String getRagistrationtype() {
		return ragistrationtype;
	}
	public void setRagistrationtype(String ragistrationtype) {
		this.ragistrationtype = ragistrationtype;
	}
	public String getRegister() {
		return register;
	}
	public void setRegister(String register) {
		this.register = register;
	}
	

}
