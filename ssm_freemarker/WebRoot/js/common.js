/**
 * 构造httpRequest
 *
 * @author 邹
 *
 * @requires
 *//*
 var GetHttpRequest = function()
 {
 if (window.XMLHttpRequest) // Gecko
 return new XMLHttpRequest();
 else if (window.ActiveXObject) // IE
 return new ActiveXObject("MsXml2.XmlHttp");
 }

 *//**
 * 通过url加载js/css,可回调
 *
 * @author 邹
 *
 * @requires
 *//*
 var loadPage = function(url , cb) {
 var oXmlHttp = GetHttpRequest();
 var type = url.substr(url.lastIndexOf(".") + 1);
 oXmlHttp.onload = function()
 {
 if (oXmlHttp.readyState == 4)
 {
 if (oXmlHttp.status == 200 || oXmlHttp.status == 304)
 {
 IncludeJS(url, type, oXmlHttp.responseText);
 if(cb)cb();
 }
 else
 {
 alert('XML request error: ' + oXmlHttp.statusText + ' ('
 + oXmlHttp.status + ')');
 }
 }
 }
 oXmlHttp.open('GET', url, true);
 oXmlHttp.send(null);
 }

 *//**
 * 构造js/css标签
 *
 * @author 邹
 *
 * @requires
 *//*
 var IncludeJS = function(fileUrl, type,  source)
 {
 if ((source != null)) {
 var oHead = document.getElementsByTagName('HEAD').item(0);
 if(type == "css"){
 var ele = document.createElement("link");
 ele.type = "text/css";
 ele.rel = "stylesheet";
 ele.text = source;
 }else{
 var ele = document.createElement("script");
 ele.language = "javascript";
 ele.type = "text/javascript";
 ele.defer = true;
 ele.text = source;
 }
 oHead.appendChild(ele);
 }
 }

 *//**
 * 处理移动端click事件延迟的方法
 *
 * @author 邹
 *
 * @requires
 *//*
 loadPage("//cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js",function(){
 window.addEventListener('load', function () {
 FastClick.attach(document.body);
 }, false);
 });*/



/* 信息提示 */
function message(msg, time) {
    var t = 2;
    if (time) {
        t = time;
    }
    layer.open({
        content: msg,
        style: 'background-color:rgba(0,0,0,.8); color:#f2f2f2; border:none;padding: .5rem 1.5rem;',
        time: t
    });
}

/* 检查手机号码是否正确 */
function checkMobileNo(mobileNo) {
    var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
    if (!mobileNo.match(isMobile)) {
        return false;
    }
    return true;
}

/* 手机验证码倒计时 */
$(function () {
    $('#btnCode').click(function () {
        //检查是否输入手机号码
        var mobileNo = $("#mobileNo").val();
        if (mobileNo == null || mobileNo == '') {
            message('请输入手机号码');
            $("#mobileNo").focus();
            return false;
        }

        if (!checkMobileNo(mobileNo)) {
            message('请正确填写手机号码');
            $("#mobileNo").focus();
            return false;
        }

        var info = checkMobileIs();
        var state = info.state;
        if (state == '0') {
            message(info.message);
            return false;
        }

        sendCodeRequest();

        //倒计时秒数
        var count = 60;
        var countdown = setInterval(CountDown, 1000);
        var msg = "动态验证码已经发送至手机&nbsp" + mobileNo;
        message(msg);

        function CountDown() {
            $("#btnCode").attr("disabled", true);
            $("#btnCode").attr("style", "color: #dbdbdb");
            $("#btnCode").val(count + "秒后重发");
            if (count == 0) {
                $("#btnCode").val("获取验证码").removeAttr("disabled");
                $("#btnCode").removeAttr("style");
                clearInterval(countdown);
            }
            count--;
        }
    })
});

/** 回退 **/
function goBack() {
    history.go(-1);
}

/**
 * 餐饮店铺首页：获得相应菜品分类下的菜单
 * @param storeId
 *            店铺ID，用于通过AJAX作为条件取值
 * @param classId
 *            菜品分类ID
 * @param requestUrl
 *            请求地址头部
 */
function ajaxStoreDishes(storeId, classId, requestUrl) {
    $.ajax({
        dataType: 'json',
        url: requestUrl + '/restaurentStore/restaurent_class.htm',
        data: {storyid: storeId, id: classId},
        beforeSend: function () {
            //这里处理提交之前的动作，如：将按扭设为一定时间内不可点击
        },
        success: function (data) {
            var htmlInfo = '';
            var dataItems = data.items;
            for (var i = 0; i < dataItems.length; i++) {
                htmlInfo += "<li>";
                htmlInfo += "<a href=" + requestUrl + "/restaurent_goods_" + dataItems[i].id + ".htm>";
                htmlInfo += "<div class='proPic fl'>";
                htmlInfo += "<img src='" + requestUrl + "/resources/images/catering/propic02.jpg'>";
                htmlInfo += "</div>";
                htmlInfo += "<div class='info'>";
                htmlInfo += "<p class='title'>" + dataItems[i].goods_name + "</p>";
                htmlInfo += "<p>剩余" + dataItems[i].goods_inventory + "份</p>";
                htmlInfo += "<p>";
                htmlInfo += "<span class='price'>&yen;" + dataItems[i].goods_current_price + "</span>/份";
                htmlInfo += "</p>";
                htmlInfo += "</div>";
                htmlInfo += "<div class='addTocart'>";
                htmlInfo += "<input type='checkbox' id='r-checkbox' class='checkbox'>";
                htmlInfo += "<label for='r-checkbox'></label>";
                htmlInfo += "</div>";
                htmlInfo += "</a>";
                htmlInfo += "</li>";
            }

            $("#tabs").children().removeAttr("class");
            $("#" + classId).attr("class", "current");


            $('#listContent').html(htmlInfo);
        }
    });
}


/**
 * 店铺子页：获得相应菜品分类下的菜单
 * @param storeId
 *            店铺ID，用于通过AJAX作为条件取值
 * @param classId
 *            菜品分类ID
 * @param requestUrl
 *            请求地址头部
 */
function ajaxClassDishes(storeId, classId, requestUrl) {
    $.ajax({
        dataType: 'json',
        url: requestUrl + '/restaurentStore/restaurent_class.htm',
        data: {storyid: storeId, id: classId},
        beforeSend: function () {
            //这里处理提交之前的动作，如：将按扭设为一定时间内不可点击
        },
        success: function (data) {
            var htmlInfo = '';
            var dataItems = data.items;
            for (var i = 0; i < dataItems.length; i++) {
                htmlInfo += "<li>";
                htmlInfo += "<a href=" + requestUrl + "/restaurent_goods_" + dataItems[i].id + ".htm>";
                htmlInfo += "<div class='proPic fl'>";
                htmlInfo += "<img src='" + requestUrl + "/resources/images/catering/propic02.jpg'>";
                htmlInfo += "</div>";

                htmlInfo += "<div class='info fl'>";

                htmlInfo += "<p class='title'>" + dataItems[i].goods_name + "</p>";
                htmlInfo += "<p>";
                htmlInfo += "<span class='price'>&yen;" + dataItems[i].goods_current_price + "</span>/份";
                htmlInfo += "</p>";

                htmlInfo += "<div class='numBox'>";
                htmlInfo += "<span class='reduce'>减少</span>";
                htmlInfo += "<span class='numInputCon'>";
                htmlInfo += "<input type='text' class='numInput' value='1' >";
                htmlInfo += "</span>";
                htmlInfo += "<span class='add'>增加</span>";
                htmlInfo += "</div>";

                htmlInfo += "</div>";

                htmlInfo += "<div class='checkBox'>";
                htmlInfo += "<input type='checkbox' id='r-checkbox" + dataItems[i].id + "'><label class='checkbox1' for='r-checkbox" + dataItems[i].id + "'></label>";
                htmlInfo += "</div>";

                htmlInfo += "</a>";

                htmlInfo += "</li>";
            }

            $("#tabs").children().removeAttr("class");
            $("#" + classId).attr("class", "current");


            $('#listContent').html(htmlInfo);
        }
    });
}


/**
 * 检查checkbox是否有选中
 * 有选中：true
 * 未选中：false
 */
function isCheckbox() {
    var falg = 0;
    $("input[type='checkbox']").each(function () {
        if ($(this).is(':checked')) {
            falg = 1;
            return false;
        }
    });

    if (falg > 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断设备类型
 */
var browserRedirect = function () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs) {
        return "iphone";
    } else if (bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return "android";
    } else {
        return "pc";
    }
}

//加载项
var toggleShade = function (isOpen, cus_shade_key) {
    if (cus_shade_key) {
        $("#cus_shade_key").text(cus_shade_key);
    }
    if (isOpen == 1) {
        $("#loadding").show();
    } else {
        $("#loadding").hide();
    }
}

var lodding =
    "<div id='loadding' style='position: absolute;top: 0;right: 0;bottom: 0;left: 0;z-index: 999990;display: none'>" +
    "<div style='position: fixed;width: 95px;height: 95px;top: 0;right: 0;bottom: 0;left: 0;margin: auto;color: #fff;text-align: center;  background: rgba(0, 0, 0, 0.55);border-radius:5px'>" +
    "  <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+CiAgPGNpcmNsZSB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4IDApIiBjeD0iMCIgY3k9IjE2IiByPSIwIj4gCiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7IDQ7IDA7IDAiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwIgogICAgICBrZXl0aW1lcz0iMDswLjI7MC43OzEiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC42IDAuNCAwLjg7MC4yIDAuNiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYgMCkiIGN4PSIwIiBjeT0iMTYiIHI9IjAiPiAKICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDsgNDsgMDsgMCIgZHVyPSIxLjJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuMyIKICAgICAga2V5dGltZXM9IjA7MC4yOzAuNzsxIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuNiAwLjQgMC44OzAuMiAwLjYgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0IDApIiBjeD0iMCIgY3k9IjE2IiByPSIwIj4gCiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7IDQ7IDA7IDAiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjYiCiAgICAgIGtleXRpbWVzPSIwOzAuMjswLjc7MSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjYgMC40IDAuODswLjIgMC42IDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9jaXJjbGU+Cjwvc3ZnPgo=' style='width: 54px!important;display:inline!important' />" +
    "  <div id='cus_shade_key' style='font: 16px/2 NotoSansHans-Regular,AvenirNext-Regular,'proxima-nova','Hiragino Sans GB','Microsoft YaHei','WenQuanYi Micro Hei','Open Sans','Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight: lighter;'>正在加载...</div>          " +
    "</div>" +
    "</div>";
var BackCookie = {
    setCookie: function (name, value) {
        var cval = this.getCookie(name);
        if (cval == null) {
            var hour = 4;
            var exp = new Date();
            exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        }
    },
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    getCookie: function (name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null)
            return unescape(arr[2]);
        return null;
    },
    setPageReferrer: function () {
        var path = window.location.pathname;
        path = path.substring(path.lastIndexOf('/') + 1, path.length);
        var referrer = this.getReferrer();
        this.setCookie(path, referrer);
    },
    getPageReferrer: function () {
        var path = window.location.pathname;
        path = path.substring(path.lastIndexOf('/') + 1, path.length);
        var referrer = this.getCookie(path);
        if (referrer != null) {
            this.delCookie(path);
        }
        return referrer;
    },
    getReferrer: function () {
        var referrer = document.referrer;
        if (!referrer) {
            try {
                if (window.opener) {
                    referrer = window.opener.location.href;
                }
            }
            catch (e) {
            }
        }
        return referrer;
    }


}

$(function () {
    $("body").append(lodding);
    BackCookie.setPageReferrer();
    backFun();
})


//回退方法
function backFun() {

    $(".btn-back").on("touchend", function () {
        var href_ = $(this).attr("href");
        if (href_.indexOf("http") >= 0 || href_.indexOf("javascript:history") >= 0) {
            appApi.openNewWindow(href_);
            return;
        }
        var referrer = document.referrer;
        if (!referrer) {
            try {
                if (window.opener) {
                    referrer = window.opener.location.href;
                    return;
                }
            }
            catch (e) {
            }
        }
        var cookieReferr = BackCookie.getPageReferrer();
        console.log("cookieReferr=" + cookieReferr);
        if (cookieReferr == null) {
            appApi.openNewWindow(referrer);
        } else {
            $(".btn-back").attr("href", cookieReferr);
            appApi.openNewWindow(cookieReferr);
        }
    });

}


function go(url) {
    toggleShade(1);
    if (url) {
        appApi.openNewWindow(url);
    } else {
        setTimeout(function () {
            toggleShade(0);
        }, 1000)
    }
}

$(function () {
    var w = $(".goods-item-pic").width();
    $(".goods-item-pic").height(w);
});
var foodList = {
    init: function () {
        $(".i-close").click(function () {
            foodList.closeclick();
        })
        this.clickclose();
        this.shuibian();
    }, clickclose: function () {
            $.ajax({
                url: web_path + "/seller/coupon_food_list.htm",
                success: function (foodList) {
                    if (foodList != null && foodList != "" && foodList.trim().length > 0) {
                        $(".pop-inner").append(foodList);
                    }
                    if (ListSize > 0) {
                        $("#J_PopWrap11").css({"display": "flex"});
                    }else{
                        $("#J_PopWrap11").css({"display": "none"});
                    }
                }
            })

            $(".mod-poplayer").css({"display": "flex"});

    }, closeclick: function () {
        $(".mod-poplayer").css({"display": "none"});
    }, shuibian: function () {
        $("#shuibian").load(web_path + "/order/order_addr_data.htm", function () {
            $("#address").click(function () {
                closeAddressDiv('defalutAddressListDiv', '1');
                var addess = $(".address .area_infoTxt").html();
                $("#address").html(addess);
            });
        });
    }

}
