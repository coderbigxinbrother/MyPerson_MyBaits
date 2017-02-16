package com.yc.dao;

import java.util.List;


import org.apache.ibatis.session.SqlSession;

import com.yc.bean.Person;

public class PersonDao {
	// 获得所有用户信息
	public List<Person> getAll(){
		SqlSession session = MybatisUtils.getSqlSession(true);
		Person person = new Person();
		List<Person> list = session.selectList("com.yc.dao.mapper.PersonMapper.findPerson", person);
		session.commit();// 要将session.commit()，二级缓存才起作用
		return list;
	}
	//获得指定用户的信息
	public Person get(int id){
		SqlSession session = MybatisUtils.getSqlSession(true);
		Person person = new Person();
		person.setPid(id);
		Person p = session.selectOne("com.yc.dao.mapper.PersonMapper.findPerson",person);
		session.commit();
		return p;
	}
	//更新指定用户的信息
	public void update(Person person){
		SqlSession session = MybatisUtils.getSqlSession(true);
		session.update("com.yc.dao.mapper.PersonMapper.updatePerson", person);
		session.commit();
	}
}
