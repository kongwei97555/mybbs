package com.kongwei.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.kongwei.bean.User;
import com.kongwei.mapper.UserMapper;
import com.kongwei.service.UserService;

public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;
	public User findUserById(int id) throws Exception {
		return userMapper.findUserById(id);
	}
	@Override
	public User findUserByUsernameAndPassword(User user) throws Exception {
		return userMapper.findUserByUsernameAndPassword(user);
	}
	
}
