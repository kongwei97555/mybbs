package com.kongwei.dao;

import com.kongwei.bean.User;
//dao�ӿ�
public interface UserDao {
	//���id��ѯ�û���Ϣ
	public User findUserById(int id) throws Exception;
	//����û�
	public void insertUser(User user)throws Exception;
	//�����û�
	public void updateUser(User user)throws Exception;
	//ɾ���û�
	public void deleteUser(int id)throws Exception;
}
