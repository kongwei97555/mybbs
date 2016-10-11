package com.kongwei.dao.impl;
import org.apache.log4j.Logger;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Properties;

/**
 * @author zhouchunhui 
 * 2015年9月11日
 */
public class MsgConfig {
	
    private static final Logger logger = Logger.getLogger(MsgConfig.class);
	public static String android_apiKey="";
	public static String android_secretKey="";
	public static String ios_apiKey="";
	public static String ios_secretKey="";

    public static String alidayun_app_key   = "alidayun_app_key";
    public static String alidayu_app_secret = "alidayu_app_secret";
    public static String alidayu_sign_name  = "alidayu_sign_name";
    public static String alidayu_sms_url    = "alidayu_sms_url";
    public static String alidayu_sms_model  = "normal";

	public static int expiresTime;
	public static int msgType = 1;// 1：通知,0:透传消息. 默认为0 注：IOS只有通知.这里只支持通知
	public static int builderId = 0;
	public static int basicStyle = 4;

	static {
		Properties prop = new Properties();
		//InputStream in = MsgConfig.class.getResourceAsStream("/config.properties");
		try {
			//prop.load(in);
            prop.load(new InputStreamReader(MsgConfig.class.getClassLoader().getResourceAsStream("config.properties"), "UTF-8"));

            if(Utils.isNotEmpty(prop.getProperty("android_apiKey")))
				android_apiKey =prop.getProperty("android_apiKey").trim() ;
			
			if(Utils.isNotEmpty(prop.getProperty("android_secretKey")))
				android_secretKey = prop.getProperty("android_secretKey").trim();
			
			if(Utils.isNotEmpty(prop.getProperty("ios_apiKey")))
				ios_apiKey =prop.getProperty("ios_apiKey").trim() ;
			
			if(Utils.isNotEmpty(prop.getProperty("ios_secretKey")))
				ios_secretKey = prop.getProperty("ios_secretKey").trim();

            if(Utils.isNotEmpty(prop.getProperty("alidayun_app_key")))
                alidayun_app_key =prop.getProperty("alidayun_app_key").trim() ;

            if(Utils.isNotEmpty(prop.getProperty("alidayu_app_secret")))
                alidayu_app_secret = prop.getProperty("alidayu_app_secret").trim();

            if(Utils.isNotEmpty(prop.getProperty("alidayu_sign_name"))){}
                alidayu_sign_name =prop.getProperty("alidayu_sign_name").trim() ;

            if(Utils.isNotEmpty(prop.getProperty("alidayu_sms_url")))
                alidayu_sms_url = prop.getProperty("alidayu_sms_url").trim();
			
			if (Utils.isEmpty(prop.getProperty("expiresTime"))) {
				expiresTime = 3600;
			} else {
				expiresTime = Integer.valueOf(prop.getProperty("expiresTime").trim());
			}

			if (Utils.isEmpty(prop.getProperty("msgType"))) {
				msgType = 1;
			} else {
				msgType = Integer.valueOf(prop.getProperty("msgType").trim());
			}

			if (Utils.isEmpty(prop.getProperty("builderId"))) {
				builderId = 0;
			} else {
				builderId = Integer.valueOf(prop.getProperty("builderId").trim());
			}

			if (Utils.isEmpty(prop.getProperty("basicStyle"))) {
				basicStyle = 4;
			} else {
				basicStyle = Integer.valueOf(prop.getProperty("basicStyle").trim());
			}
		} catch (IOException e) {
			logger.error("加载配置文件config.properties异常:",e);
			e.printStackTrace();
		}
	}

}
