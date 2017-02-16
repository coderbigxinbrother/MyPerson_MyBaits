package com.yc.test.person;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;

import com.yc.bean.Person;
import com.yc.dao.PersonDao;

public class TestPerson {

	@Test
	public void testFindAllPerson() {
		PersonDao pd = new PersonDao();
		List<Person> list = null;
		
		list = pd.getAll();
		
		System.out.println(list);
	}
	
	@Test
	public void testGetPerson() {
		PersonDao pd = new PersonDao();
		Person pp = null;
		
		pp = pd.get(2);
		
		System.out.println(pp);
	}
	
	@Test
	public void testUpdatePerson() {
		PersonDao pd = new PersonDao();
		Person pp = pd.get(2);
		pp.setPname("wangxin");
		
		pd.update(pp);;
		
	}

}
