//微信jsapi接口编写
//分享到朋友圈,分享到好友,分享到QQ,分享到微博
//与_JsWeixinPartial.cshtml的部分页配合使用
var Wxs_shareTo="timeline",
    Wxs_TimeLine="wGenerator(代码生成器),一款值得您看看的工具,开发利器!!!",
    Wxs_ShareTitle="wGenerator(代码生成器)",
    Wxs_ImgUrl = "https://wgenerator.51dmai.com/static/img/logo2.png",
    Wxs_LineLink = "https://wgenerator.51dmai.com",
    Wxs_DescContent = "支持多种数据库SQL语句解析,自定义模板生成,您值得看看的工具,开发利器!!!"
;
function initWeixinJs(config) {
    if(typeof wx == 'undefined'){
        return;
    }

    if(typeof config == 'undefined'){
        return;
    }
    if(typeof config =='string'){
        config = JSON.parse(config);
    }

    wx.config({
        debug: config.debug,                   // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appId,                   // 必填，公众号的唯一标识
        timestamp: config.timestamp,       // 必填，生成签名的时间戳
        nonceStr: config.nonceStr,         // 必填，生成签名的随机串
        signature: config.signature,       // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo',
            'previewImage',
            'chooseImage',
            'uploadImage',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'getNetworkType',
            'chooseWXPay',
            'scanQRCode',
            'openLocation',
            'getLocation'
        ]  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });


    wx.ready(function () {
        if (typeof weixinReady == 'function') {
            weixinReady();
        }
        //menuItem: favorite
        //------在此输入各种API--------------------------------------
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: Wxs_TimeLine,       // 分享标题
            link: Wxs_LineLink,        // 分享链接
            imgUrl: Wxs_ImgUrl,        // 分享图标
            trigger: function (res) {
                Wxs_shareTo = "timeline";
                this.title = Wxs_TimeLine;
                this.link = Wxs_LineLink;
                this.imgUrl = Wxs_ImgUrl;
            },
            success: function (res) {
                // 用户确认分享后执行的回调函数
                //console.log(res);

            },
            cancel: function (res) {
                tip("取消了分享");
                //_log(Wxs_shareTo, res.errMsg);
                // 用户取消分享后执行的回调函数
            }
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: Wxs_ShareTitle,   // 分享标题
            desc: Wxs_DescContent,   // 分享描述
            link: Wxs_LineLink,      // 分享链接
            imgUrl: Wxs_ImgUrl,      // 分享图标
            type: '',                // 分享类型,music、video或link，不填默认为link
            dataUrl: '',             // 如果type是music或video，则要提供数据链接，默认为空
            trigger: function (res) {
                Wxs_shareTo = res.shareTo;
                this.title = Wxs_ShareTitle;
                this.link = Wxs_LineLink;
                this.imgUrl = Wxs_ImgUrl;
                this.desc = Wxs_DescContent;
            },
            success: function (res) {
                //非收藏的情况下
                if (Wxs_shareTo != "favorite") {
                    // 用户确认分享后执行的回调函数
                    // _log(Wxs_shareTo, res.errMsg);
                }
            },
            cancel: function (res) {
                tip("取消了分享");
                //_log(Wxs_shareTo, res.errMsg);
                // 用户取消分享后执行的回调函数
            }
        });
        //QQ
        wx.onMenuShareQQ({
            title: Wxs_ShareTitle,     // 分享标题
            desc: Wxs_DescContent,     // 分享描述
            link: Wxs_LineLink,        // 分享链接
            imgUrl: Wxs_ImgUrl,        // 分享图标
            trigger: function (res) {
                Wxs_shareTo = "qq";
                this.title = Wxs_ShareTitle;
                this.link = Wxs_LineLink;
                this.imgUrl = Wxs_ImgUrl;
                this.desc = Wxs_DescContent;
            },
            success: function (res) {
                // 用户确认分享后执行的回调函数
                // _log(Wxs_shareTo, res.errMsg);
            },
            cancel: function (res) {
                tip("取消了分享");

                //_log(Wxs_shareTo, res.errMsg);
                // 用户取消分享后执行的回调函数
            }
        });

        //QQ微博
        wx.onMenuShareWeibo({
            title: Wxs_ShareTitle, // 分享标题
            desc: Wxs_DescContent, // 分享描述
            link: Wxs_LineLink, // 分享链接
            imgUrl: Wxs_ImgUrl, // 分享图标
            trigger: function (res) {
                Wxs_shareTo = "weibo";
                this.title = Wxs_ShareTitle;
                this.link = Wxs_LineLink;
                this.imgUrl = Wxs_ImgUrl;
                this.desc = Wxs_DescContent;
            },
            success: function (res) {
                // 用户确认分享后执行的回调函数
                // _log(Wxs_shareTo, res.errMsg);
            },
            cancel: function (res) {
                tip("取消了分享");
                //_log(Wxs_shareTo, res.errMsg);
                // 用户取消分享后执行的回调函数
            }
        });
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
        //所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
    wx.error(function (res) {
        //alert(res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
}
//自动消失的提示
function tip(message, type) {
    var len1 = lenReg(message); //长度
    //console.log(parseInt(len1 / 20) * 20);
    //console.log((len1 % 20 > 0 ? 20 : 0));
    var height1 = parseInt(len1 / 20) * 20 + 100 + (len1 % 20 > 0 ? 20 : 0);
    var margint1 = parseInt(height1 / 2);
    var rand = "id" + Math.random();
    var d = "<div class='tipbox1'>";
    if(type=="success"){
        d += "<p><i class=\"fa fa-check\"></i></p>";
    } else if (type == "error") {
        d += "<p><i class=\"fa fa-info-circle\"></i></p>";
    }else{
        d += "<p><i class=\"fa fa-info-circle\"></i></p>";
    }
    d += "<p>" + message + "</p></div>";

    var tipDiv = $(d).attr("id", rand).css("height", height1 + "px").css("margin-top", (0-margint1)+"px").css("z-index","20001");

    $(document.body).append(tipDiv);
    setTimeout(function () {
        tipDiv.remove();
    },2000);
}

function fixedTip(message) {
    var tipDiv = $("<div id=\"id_fixed_bottom\" class=\"overlay\"></div><div class='tipbox1' style='height:80px;'><img src='/images/loading.gif'><p>" + message + "</p></div>").attr("id", "id_tip_fixed");
    $(document.body).append(tipDiv);
}
function removeFixedTip() {
    $("#id_tip_fixed,#id_fixed_bottom").remove();
}
//获取长度#用于正确处理带汉字字符的长度
function lenReg(str) {

    return str.replace(/[^\x00-\xff]/g, '**').length;
};

//获取提示消息的文本长度
function getRegMatchLen(message) {

    var len = 0;
    var reg = /<div>(.*?)[</]div>/g;
    var arr = message.match(reg);
    if (arr != null) {
        for (var i = 0; i < arr.length; i++) {
            a_len = lenReg(arr[i].replace("<div>", "").replace("</div>", ""));
            if (a_len > len) { len = a_len; }
        }
    } else {
        len = lenReg(message);
    }
    //console.log("文本长度:" + len);
    return len;
}


