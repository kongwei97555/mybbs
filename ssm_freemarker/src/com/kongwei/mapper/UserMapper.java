package com.kongwei.mapper;

import com.kongwei.bean.User;
public interface UserMapper {
	
	public User findUserById(int id) throws Exception;
	//����û���������ѯ�û�
		public User findUserByUsernameAndPassword(User user) throws Exception;
}
