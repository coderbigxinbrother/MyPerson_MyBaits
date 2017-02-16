package com.yc.web.actions;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

//import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.yc.bean.Person;
import com.yc.dao.PersonDao;
import com.yc.web.actions.model.JsonModel;

public class PersonAction extends ActionSupport implements ModelDriven<Person>, SessionAware {

	private static final long serialVersionUID = 3044781519352127705L;
	private Map<String, Object> session;
	private Person person;
	private PersonDao pd = new PersonDao();

	private JsonModel jsonModel;

	@Override
	public void setSession(Map<String, Object> arg0) {
		this.session = arg0;
	}

	@Override
	public Person getModel() {
		person = new Person();
		return person;
	}
	
	public String updatePerson(){
		jsonModel=new JsonModel();
		try {
			pd.update(person);
			jsonModel.setCode(1);
			jsonModel.setObj(  person   );
		} catch (Exception e) {
			e.printStackTrace();
			jsonModel.setCode(0);
			jsonModel.setMsg("update fail");
		}
		return Action.SUCCESS;
	}

	public String findPerson() {
		Person per = null;
		jsonModel = new JsonModel();
		List<Person> list = (List<Person>) session.get("list");
		if (list != null) {
			for (Person p : list) {
				if (p.getPid() == person.getPid()) {
					per = p;
					break;
				}
			}
		}
		try {
			// web级别的session中没有缓存这个数据
			if (per == null) {
				per = pd.get(person.getPid());
			}
			if( per!=null){
				jsonModel.setCode(1);
				jsonModel.setObj(per);
			}else{
				jsonModel.setCode(0);
				jsonModel.setMsg("no person with id:"+person.getPid());
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			jsonModel.setCode(0);
			jsonModel.setMsg(e.getMessage());
		}
		return Action.SUCCESS;
	}

	public String findAllPerson() {
		List<Person> list = null;
		jsonModel = new JsonModel();
		try {
			list = pd.getAll();
			session.put("list", list); // redis分布式缓存 做为mybatis二级缓存 ->
										// mybatis一级缓存 -> web级别(session)的缓存
			jsonModel.setCode(1);
			jsonModel.setObj(list);
		} catch (Exception e) {
			e.printStackTrace();
			jsonModel.setCode(0);
			jsonModel.setMsg(e.getMessage());
		}
		return Action.SUCCESS;
	}

	public JsonModel getJsonModel() {
		return jsonModel;
	}

	public void setJsonModel(JsonModel jsonModel) {
		this.jsonModel = jsonModel;
	}

}
