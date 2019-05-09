function initJmenu() {
    function f(l) {
        var k = 0;
        $(l).each(function() {
            k += $(this).outerWidth(true)
        });
        return k
    }
    function g(n) {
        //console.log("单击当前选项卡,选中");
        var o = f($(n).prevAll())
          , q = f($(n).nextAll());
        var l = f($(".content-tabs").children().not(".J_menuTabs"));
        var k = $(".content-tabs").outerWidth(true) - l;
        var p = 0;
        if ($(".page-tabs-content").outerWidth() < k) {
            p = 0
        } else {
            if (q <= (k - $(n).outerWidth(true) - $(n).next().outerWidth(true))) {
                if ((k - $(n).next().outerWidth(true)) > q) {
                    p = o;
                    var m = n;
                    while ((p - $(m).outerWidth()) > ($(".page-tabs-content").outerWidth() - k)) {
                        p -= $(m).prev().outerWidth();
                        m = $(m).prev()
                    }
                }
            } else {
                if (o > (k - $(n).outerWidth(true) - $(n).prev().outerWidth(true))) {
                    p = o - $(n).prev().outerWidth(true)
                }
            }
        }
        $(".page-tabs-content").animate({
            marginLeft: 0 - p + "px"
        }, "fast");
        if(window.localStorageSupport()){
            window.localStorage.setItem("current_tab",$(n).data("code"));
        }
    }
    function a() {
        var o = Math.abs(parseInt($(".page-tabs-content").css("margin-left")));
        var l = f($(".content-tabs").children().not(".J_menuTabs"));
        var k = $(".content-tabs").outerWidth(true) - l;
        var p = 0;
        if ($(".page-tabs-content").width() < k) {
            return false
        } else {
            var m = $(".J_menuTab:first");
            var n = 0;
            while ((n + $(m).outerWidth(true)) <= o) {
                n += $(m).outerWidth(true);
                m = $(m).next()
            }
            n = 0;
            if (f($(m).prevAll()) > k) {
                while ((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
                    n += $(m).outerWidth(true);
                    m = $(m).prev()
                }
                p = f($(m).prevAll())
            }
        }
        $(".page-tabs-content").animate({
            marginLeft: 0 - p + "px"
        }, "fast")
    }
    function b() {
        var o = Math.abs(parseInt($(".page-tabs-content").css("margin-left")));
        var l = f($(".content-tabs").children().not(".J_menuTabs"));
        var k = $(".content-tabs").outerWidth(true) - l;
        var p = 0;
        if ($(".page-tabs-content").width() < k) {
            return false
        } else {
            var m = $(".J_menuTab:first");
            var n = 0;
            while ((n + $(m).outerWidth(true)) <= o) {
                n += $(m).outerWidth(true);
                m = $(m).next()
            }
            n = 0;
            while ((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
                n += $(m).outerWidth(true);
                m = $(m).next()
            }
            p = f($(m).prevAll());
            if (p > 0) {
                $(".page-tabs-content").animate({
                    marginLeft: 0 - p + "px"
                }, "fast")
            }
        }
    }
    $(".J_menuItem").each(function(k) {
        if (!$(this).attr("data-index")) {
            $(this).attr("data-index", k)
        }
    });
    function c() {
        //创建tab页
        var o = $(this).attr("href")
          , m = $(this).data("index")
          , c = $(this).data("code")
          , l = $.trim($(this).text())
          , k = true;
        if(l==""){
            l = $.trim($(this).attr("title"))
        }
        if (o == undefined || $.trim(o).length == 0) {
            return false
        }
        // console.log("cccc");
        $(".J_menuTab").each(function() {
            if ($(this).data("id") == o) {
                if (!$(this).hasClass("active")) {
                    $(this).addClass("active").siblings(".J_menuTab").removeClass("active");
                    g(this);
                    $(".J_mainContent .J_iframe").each(function() {
                        if ($(this).data("id") == o) {
                            $(this).show().siblings(".J_iframe").hide();
                            return false
                        }
                    })
                }
                k = false;
                if(window.localStorageSupport()){
                    window.localStorage.setItem("current_tab",c);
                }
                return false
            }
        });
        if (k) {
            var p = '<a href="javascript:;" class="active J_menuTab" data-id="' + o + '" data-code="'+c+'">' + l + ' <i class="fa fa-times-circle"></i></a>';
            $(".J_menuTab").removeClass("active");
            //var n = '<iframe class="J_iframe" name="iframe' + m + '" width="100%" height="100%" src="' + o + '" frameborder="0" data-id="' + o + '" seamless></iframe>';
            var n = '<div class="animated fadeInRight J_iframe" data-id="' + o + '"></div>';
            var jqueryN = $(n).css("width",$("#main-content").width());
            if($(".J_mainContent").find(".J_iframe").length>0){
                $(".J_mainContent").find(".J_iframe").hide().parents(".J_mainContent").append(jqueryN);
            }else{
                $(".J_mainContent").append(jqueryN);
            }
            jqueryN.load(getUrl(o)+"?rnd="+Math.random(),function(data,status,xhr){
                if(status=="success"){
                    if(window.localStorageSupport()){
                        window.localStorage.setItem("current_tab",c);
                    }
                    eval(c+".ready()");
                }else{
                    if(xhr.status==401){
                        tip("登录已过期或权限被去除!",null,'error');
                    }else if(xhr.status==404){
                        tip("请求的URL不存在!"+o,null,'error');
                    }else if(xhr.status==500){
                        tip("服务器端发生错误!"+o,null,'error');
                    }else{
                        var errInfo = ("Error: "+xhr.status+": "+xhr.statusText);
                        tip(errInfo,null,'error');
                    }
                }
            });

            $(".J_menuTabs .page-tabs-content").append(p);
            g($(".J_menuTab.active"))
        }
        return false
    }
    $(".J_menuItem").on("click", c);
    $(".J_menuIcon").on("click", c);
    function h() {
        //console.log("点击关闭单个tab页");
        var m = $(this).parents(".J_menuTab").data("id");
        var code = $(this).parents(".J_menuTab").data("code");
        var l = $(this).parents(".J_menuTab").width();
        if ($(this).parents(".J_menuTab").hasClass("active")) {
            if ($(this).parents(".J_menuTab").next(".J_menuTab").length>0) {
                var k = $(this).parents(".J_menuTab").next(".J_menuTab:eq(0)").data("id");
                $(this).parents(".J_menuTab").next(".J_menuTab:eq(0)").addClass("active");
                $(".J_mainContent .J_iframe").each(function() {
                    if ($(this).data("id") == k) {
                        $(this).show().siblings(".J_iframe").hide();
                        return false
                    }
                });
                var n = parseInt($(".page-tabs-content").css("margin-left"));
                if (n < 0) {
                    $(".page-tabs-content").animate({
                        marginLeft: (n + l) + "px"
                    }, "fast")
                }
                $(this).parents(".J_menuTab").remove();
                $(".J_mainContent .J_iframe").each(function() {
                    if ($(this).data("id") == m) {
                        $(this).remove();
                        return false
                    }
                })
            }
            if ($(this).parents(".J_menuTab").prev(".J_menuTab").length>0) {
                var k = $(this).parents(".J_menuTab").prev(".J_menuTab:last").data("id");
                $(this).parents(".J_menuTab").prev(".J_menuTab:last").addClass("active");
                $(".J_mainContent .J_iframe").each(function() {
                    if ($(this).data("id") == k) {
                        $(this).show().siblings(".J_iframe").hide();
                        return false
                    }
                });
                $(this).parents(".J_menuTab").remove();
                $(".J_mainContent .J_iframe").each(function() {
                    if ($(this).data("id") == m) {
                        $(this).remove();
                        return false
                    }
                })
            }
        } else {
            $(this).parents(".J_menuTab").remove();
            $(".J_mainContent .J_iframe").each(function() {
                if ($(this).data("id") == m) {
                    $(this).remove();
                    return false
                }
            });
            g($(".J_menuTab.active"))
        }

        //选中的选项卡
        if(window.localStorageSupport()){
            var storageCode = window.localStorage.getItem("current_tab");
            if(code == storageCode){
                window.localStorage.setItem("current_tab","");
            }
        }
        return false
    }
    $(".J_menuTabs").on("click", ".J_menuTab i", h);
    function i() {
        $(".page-tabs-content").children("[data-id]").not(":first").not(".active").each(function() {
            $('.J_iframe[data-id="' + $(this).data("id") + '"]').remove();
            $(this).remove()
        });
        $(".page-tabs-content").css("margin-left", "0")
    }
    $(".J_tabCloseOther").on("click", i);
    function j() {
        g($(".J_menuTab.active"))
    }
    $(".J_tabShowActive").on("click", j);
    function e() {
        if (!$(this).hasClass("active")) {
            var k = $(this).data("id");
            $(".J_mainContent .J_iframe").each(function() {
                if ($(this).data("id") == k) {
                    $(this).show().siblings(".J_iframe").hide();
                    return false
                }
            });
            $(this).addClass("active").siblings(".J_menuTab").removeClass("active");
            g(this)
        }
    }
    $(".J_menuTabs").on("click", ".J_menuTab", e);
    function d(sourceSelector) {
        var me = this;
        //console.log("typeof source",typeof(sourceSelector));
        if(sourceSelector!=null && (typeof(sourceSelector)=='string')){
            me = sourceSelector;
        }
        //双击刷新被调用
        var url = $(me).data("id");
        var code = $(me).data("code");
        var l = $('.J_iframe[data-id="' + url + '"]');
        //alert(url);
        //var k = l.attr("src")
        if(url!="/index"){
            l.html("loading...").load(url+"?rnd="+Math.random(),function(data,status,xhr){
                if(status=="success"){
                    eval(code+".ready()");
                }else{
                    if(xhr.status==401){
                        tip("登录已过期或权限被去除!",null,'error');
                    }else if(xhr.status==404){
                        tip("请求的URL不存在!"+url,null,'error');
                    }else if(xhr.status==500){
                        tip("服务器端发生错误!"+url,null,'error');
                    }else{
                        var errInfo = ("Error: "+xhr.status+": "+xhr.statusText);
                        tip(errInfo,null,'error');
                    }
                }
            });
        }
    }
    $(".J_menuTabs").on("dblclick", ".J_menuTab", d);
    $(".J_tabLeft").on("click", a);
    $(".J_tabRight").on("click", b);
    $(".J_tabCloseAll").on("click", function() {
        $(".page-tabs-content").children("[data-id]").not(":first").each(function() {
            $('.J_iframe[data-id="' + $(this).data("id") + '"]').remove();
            $(this).remove()
        });
        $(".page-tabs-content").children("[data-id]:first").each(function() {
            $('.J_iframe[data-id="' + $(this).data("id") + '"]').show();
            $(this).addClass("active")
        });
        $(".page-tabs-content").css("margin-left", "0");
        if(window.localStorageSupport()){
            window.localStorage.setItem("current_tab","");
        }
    });
    $(".J_tabRefresh").on("click",function(){
        //获取当前焦点的选项卡,然后刷新
        d(".J_menuTab.active");
    });
}
