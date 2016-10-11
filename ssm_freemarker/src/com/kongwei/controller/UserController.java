package com.kongwei.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.kongwei.dao.impl.AlidayuSMSKit;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;
import com.taobao.api.response.AlibabaAliqinFcSmsNumSendResponse;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.kongwei.service.UserService;

import java.util.HashMap;
import java.util.Random;

@Controller
public class UserController {
	@Autowired
	private UserService userService;

	@RequestMapping(value="/index", method = RequestMethod.GET)
	public ModelAndView index(HttpServletRequest arg0,HttpServletResponse arg1,HttpSession session) throws Exception {
			ModelAndView model=new ModelAndView();
			model.setViewName("index");
		return model;
	}
	@RequestMapping(value="/user/login", method = RequestMethod.GET)
	public ModelAndView check_img(HttpServletRequest arg0,HttpServletResponse arg1,HttpSession session) throws Exception {
		ModelAndView model=new ModelAndView();
		model.setViewName("/user/login");
		return model;
	}
	@RequestMapping(value="/user/register", method = RequestMethod.GET)
	public ModelAndView register(HttpServletRequest arg0,HttpServletResponse arg1,HttpSession session) throws Exception {
		ModelAndView model=new ModelAndView();
		model.setViewName("/user/register");
		return model;
	}
	@RequestMapping(value="/user/register_user", method = RequestMethod.GET)
	public void register_user(HttpServletRequest request,HttpSession session,String authCode,String mobile,String password) throws Exception {

	}
	//登陆注册找回密码验证码
	@RequestMapping(value="/user/sendCode", method = RequestMethod.GET)
	public void sendCode(HttpServletRequest request,HttpServletResponse response,HttpSession session,String mobile) throws Exception {
		JSONObject json=new JSONObject();
		try{
			HashMap map=new HashMap();
			String code=getCode();
			map.put("code",code);
			 AlidayuSMSKit alidayuSMSKit=new AlidayuSMSKit();
			//如果发送成功
			if(alidayuSMSKit.smsBaseSend("SMS_16680982",mobile,map)){
				session.setAttribute("register_code",code);
				json.put("success",true);
			}
			else{
				json.put("success",false);
			}
		}catch (Exception e){
			e.printStackTrace();
			json.put("success",false);
		}
		response.getWriter().write(json.toString());
	}
	public String getCode(){
		Random random = new Random();
		int x = random.nextInt(899999);
		x = x+100000;
		return String.valueOf(x);
	}
}
