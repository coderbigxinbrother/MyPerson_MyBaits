package com.yc.bean;

import java.io.Serializable;

public class Person implements Serializable{

	private Integer pid;
	private String pname;
	private String pwd;
	public Integer getPid() {
		return pid;
	}
	public void setPid(Integer pid) {
		this.pid = pid;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	@Override
	public String toString() {
		return "Person [pid=" + pid + ", pname=" + pname + ", pwd=" + pwd + "]";
	}
	
	
}
