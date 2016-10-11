package com.kongwei.service;

import com.kongwei.bean.User;

public interface UserService {
	//根据id查询用户
	public User findUserById(int id) throws Exception;
	//����û���������ѯ�û�
	public User findUserByUsernameAndPassword(User user) throws Exception;
}
