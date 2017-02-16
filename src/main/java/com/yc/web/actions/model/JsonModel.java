package com.yc.web.actions.model;

import java.io.Serializable;

public class JsonModel implements Serializable {

	private static final long serialVersionUID = -2579231674142369508L;

	private Integer code;
	private String msg;
	private Object obj;

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}

}
