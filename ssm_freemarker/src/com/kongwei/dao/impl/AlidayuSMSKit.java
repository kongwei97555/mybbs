package com.kongwei.dao.impl;


import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;
import com.taobao.api.response.AlibabaAliqinFcSmsNumSendResponse;
import org.apache.log4j.Logger;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Created by moyun on 2016/9/5.
 */

@Component
public class AlidayuSMSKit {

    private static Logger logger = Logger.getLogger(AlidayuSMSKit.class);

    /**
     *  阿里大鱼短信发送基础接口
     *  参数说明
     *      @param  sms_tempte_id  短信模版ID
     *      @param  mobiles        手机号码  群发短信需传入多个号码，以英文逗号分隔，一次调用最多传入200个号码
     *      @param  paramMaps      短信模板变量，传参规则{"key":"value"}，key的名字须和申请模板中的变量名一致，多个变量之间以逗号隔开
     *
     *  可参考:https://api.alidayu.com/doc2/apiDetail?spm=a3142.7395905.1999205496.20.rZWgAV&apiId=25450
     *
     * */
    public boolean smsBaseSend(String sms_tempte_id,String mobiles,Map<String,Object> paramMaps){
        boolean result = false;
        try {
            logger.info("-----> 短信参数"+MsgConfig.alidayun_app_key+" "+MsgConfig.alidayu_app_secret+" "+MsgConfig.alidayu_sign_name);

            if(mobiles==null){
                logger.info("-----> 手机号码为"+mobiles);
                return false;
            }

            TaobaoClient client = new DefaultTaobaoClient(MsgConfig.alidayu_sms_url, MsgConfig.alidayun_app_key, MsgConfig.alidayu_app_secret);
            AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
            req.setSmsType(MsgConfig.alidayu_sms_model);
            req.setSmsFreeSignName(MsgConfig.alidayu_sign_name);
            if(Utils.isNotEmpty(paramMaps)){
                req.setSmsParamString(JSONObject.toJSONString(paramMaps));
            }
            req.setRecNum(mobiles);
            req.setSmsTemplateCode(sms_tempte_id);
            AlibabaAliqinFcSmsNumSendResponse rsp = client.execute(req);
            JSONObject object = JSON.parseObject(rsp.getBody());
            if(object!=null && Utils.isNotEmpty(object.get("error_response"))){
                result = false;
            }
            if(object!=null && Utils.isNotEmpty(object.get("alibaba_aliqin_fc_sms_num_send_response"))){
                Map<String,Object> maps = (Map<String,Object>)object.get("alibaba_aliqin_fc_sms_num_send_response");
                Map<String,Object> map = (Map<String,Object>)maps.get("result");
                Integer err_code = Integer.valueOf(map.get("err_code").toString());
                if(err_code==0){
                    result = true;
                }
            }
            logger.info(rsp.getBody());
        }catch (Exception e){
            logger.error("阿里大鱼短信发送接口异常",e);
        }
        return result;
    }
}
