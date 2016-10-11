package com.kongwei.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.kongwei.bean.User;
import com.kongwei.dao.UserDao;
public class UserDaoImpl implements UserDao{
	//��Ҫ��ӿ�ʵ������ע��SqlSessionFactory
	//����ͨ���캯��ע��
	private SqlSessionFactory sqlSessionFacroty;
	public UserDaoImpl(SqlSessionFactory sqlSessionFacroty){
		this.sqlSessionFacroty=sqlSessionFacroty;
	}
	@Override
	public User findUserById(int id) throws Exception {
		SqlSession sqlSession=sqlSessionFacroty.openSession();
		User user=sqlSession.selectOne("test.findUserById", 27);
		sqlSession.close();
		return user;
	}

	@Override
	public void insertUser(User user) throws Exception {
		// TODO Auto-generated method stub
		SqlSession sqlSession=sqlSessionFacroty.openSession();
		sqlSession.insert("test.insertUser", user);
		sqlSession.commit();
		sqlSession.close();
	}

	@Override
	public void updateUser(User user) throws Exception {
		SqlSession sqlSession=sqlSessionFacroty.openSession();
		sqlSession.update("test.updateUser", user);
		sqlSession.commit();
		sqlSession.close();
	}

	@Override
	public void deleteUser(int id) throws Exception {
		SqlSession sqlSession=sqlSessionFacroty.openSession();
		sqlSession.delete("test.deleteUser", id);
		sqlSession.commit();
		sqlSession.close();
 	}

}
