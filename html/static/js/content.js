function $childNode(o) {
    return window.frames[o]
}
function animationHover(o, e) {
    o = $(o),
        o.hover(function() {
            o.addClass("animated " + e)
        }, function() {
            window.setTimeout(function() {
                o.removeClass("animated " + e)
            }, 2e3)
        })
}
function WinMove() {
    var o = "[class*=col]"
        , e = ".ibox-title"
        , i = "[class*=col]";
    $(o).sortable({
        handle: e,
        connectWith: i,
        tolerance: "pointer",
        forcePlaceholderSize: !0,
        opacity: .8
    }).disableSelection()
}
var $parentNode = window.parent.document;
// if ($(".tooltip-demo").tooltip({
//     selector: "[data-toggle=tooltip]",
//     container: "body"
// }),
//     $(".modal").appendTo("body"),
//     $("[data-toggle=popover]").popover(),
//     $(".collapse-link").click(function() {
//         var o = $(this).closest("div.ibox")
//             , e = $(this).find("i")
//             , i = o.find("div.ibox-content");
//         i.slideToggle(200),
//             e.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),
//             o.toggleClass("").toggleClass("border-bottom"),
//             setTimeout(function() {
//                 o.resize(),
//                     o.find("[id^=map-]").resize()
//             }, 50)
//     }),
//     $(".close-link").click(function() {
//         var o = $(this).closest("div.ibox");
//         o.remove()
//     }),
// top == this) {
//     var gohome = '<div class="gohome"><a class="animated bounceInUp" href="index.html?v=4.1.0" title="返回首页"><i class="fa fa-home"></i></a></div>';
//     $("body").append(gohome)
// }

function formAjaxSubmit(options){
    if(options==null){
        tip("需要先指定表单基本信息","错误","error");
        return false;
    }
    //基础校验,使用校验插件进行
    if(options.baseValidate!=null){
        var baseValid = $(options.id).validate(options.baseValidate);
        if(!baseValid.form()){
            return false;
        }
    }
    //获取当前表单中的值
    var formItemObject = $(options.id).serializeJSON();//JSON.stringify($(options.id).serializeJSON());  //序列化表单
    if(options.advanceValidate !=null && typeof(options.advanceValidate)=='function'){
        var isAdvancePass = options.advanceValidate(formItemObject);
        if(!isAdvancePass){
            return false;
        }
    }
    var url = $(options.id).attr("action");
    var method = $(options.id).attr("method");
    var buttonClick = $(options.button).attr("onclick");
    $(options.button).removeAttr("onclick");
    if(options.loading){
        $(options.button).ladda();
        $(options.button).ladda( 'start' );
    }
    $.ajax({
        url: url,
        type: method || "GET",
        dataType: "json",
        data: JSON.stringify(formItemObject),
        contentType:"application/json",  //缺失会出现URL编码，无法转成json对象
        success:function(res){
            //console.log(JSON.stringify(res));
            $(options.button).attr("onclick",buttonClick);
            if(options.loading){
                $(options.button).ladda( 'stop' );
            }
            if(res.success){
                tip(res.message,"提示","success");
                if(typeof(options.callback)=='function'){
                    options.callback(res);
                }
                if(options.closeModal && typeof(closeWindow)=='function'){
                    closeWindow();
                }
            }else{
                tip(res.message,"提示","error");
            }
        },
        error:function(xhr,status,err){
            $(options.button).attr("onclick",buttonClick);
            if(options.loading){
                setTimeout(function(){
                    $(options.button).ladda( 'stop' );
                },1000);
            }
            var loadError ="Error: "+xhr.status+": "+xhr.statusText;
            if(xhr.status==401){
                loadError = "登录已过期或权限被去除!"
            }else if(xhr.status==404){
                loadError = "请求的URL不存在,"+url;
            }
            tip(loadError,"提示","error");
        }
    });

    return false;
}

function retrievePassword(){

    var baseValidate={
        rules: {
            userName:{required:true},
            validateCode: {
                required: true,
                minlength: 8
            },
            newPwd: {
                required: true
            },
            repeatNewPwd: {
                required: true,
                equalTo: '#newPwd'
            }
        },
        messages:{
            userName:{
                required: '请输入用户名'
            },
            validateCode: {
                required: '请输入验证码',
                minlength: '至少输入8位哦'
            },
            newPwd: {
                required: '(请输入新密码)'
            },
            repeatNewPwd: {
                required: '(请再次输入新密码)',
                equalTo: '两次输入的密码不一致'
            }
        },
        // errorPlacement: function(error, element) {
        //     //错误信息位置设置方法
        //     //这里的element是录入数据的对象
        //     error.appendTo( element.prev() );
        // }
    };

    var advanceValidate = function(data){
        //console.log("advance validate data:",typeof(data));
        if(data==null){
            tip("数据源为空","","error");
            return false;
        }
        if(typeof(data)=='string'){
            data = JSON.parse(data);
        }
        if(data.newPwd !== data.repeatNewPwd){
            tip("两次输入的新密码不一致","","error");
            return false;
        }
        return true;
    }

    var opt={
        id:'#retrieve_pwd_form',
        loading: true,
        closeModal: true,
        callback: function(res){
            //console.log("callback",res);
            document.location.href="/login";
        },
        button: '#retrieve_pwd_submit',
        baseValidate: baseValidate,
        advanceValidate: advanceValidate
    };
    return formAjaxSubmit(opt);
}
function tip(message,title,type) {
    var shortCutFunction = type || 'info';
    var msg = message || '请输入消息内容';
    var title = title || '提示';
    //var toastIndex = toastCount++;
    toastr.options = {
        closeButton: true,
        debug: false,
        progressBar: false,
        preventDuplicates: false,  //忽略重复
        positionClass: 'toast-top-right',
        onclick: null,
        showDuration: 400,
        hideDuration: 2000,
        timeOut: 2000,
        showEasing:'swing',
        hideEasing:'linear',
        showMethod:'fadeIn',
        hideMethod:'fadeOut'
    };

    if("success"==type){
        toastr.success(msg, title); // Wire up an event handler to a button in the toast, if it exists
    }else if("info"==type){
        toastr.info(msg,title);
    }else if("warning"==type){
        toastr.warning(msg,title);
    }else{
        toastr.error(msg,title);
    }
}


function initFormRemoteData(formId){
    // $('.chosen-select',$(formId)).chosen({width: "100%",disable_search:true});
    $(formId).find("[data-url]").each(function() {
        var me = $(this);
        var url = $(this).data("url");
        var control=$(this).data("control");
        var cname=$(this).data("cname");
        var append = $(this).data("append");
        var callback = $.trim($(this).data("callback"));
        var query = {};
        if($(this).data("query")!=null){
            query = JSON.parse($(this).data("query"));
        }
        var defaultValue = $(this).data("val");
        if(defaultValue==null){
            defaultValue="";
        }else{
            defaultValue=defaultValue+"";
        }
        // console.log("初始化表单远程数据+++"+defaultValue,me);
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(query),
            contentType:"application/json",  //缺失会出现URL编码，无法转成json对象
            success:function(res){
                if(res.success){
                    //console.log("初始化表单远程数据",res);
                    var html="";
                    if(me[0].tagName=="SELECT"){
                        if(append!=null && append!=""){
                            var appendArr = append.split('|');
                            html+="<option value='"+appendArr[0]+"'>"+appendArr[1]+"</option>";
                        }
                        $.each(res.data,function(i,v){
                            if(typeof(v.id)!='undefined'){
                                html+="<option value='"+v.id+"'>"+v.name+"</option>";
                            }else if(typeof(v.key)!='undefined'){
                                html+="<option value='"+v.key+"'>"+v.value+"</option>";
                            }
                        });
                        me.empty().html(html);
                        if(defaultValue!=""){
                            //console.log("设置默认值");
                            $(me).val(defaultValue+"");
                        }
                        if($(me).attr("class").indexOf('chosen-select')>=0){
                            $(me).trigger("chosen:updated");
                        }
                    }else if(control.toUpperCase()=="CHECKBOX"){
                        $.each(res.data,function(i,v){
                            var vv = typeof(v.id)!='undefined'?v.key:v.id;
                            var checked = defaultValue.indexOf(vv)>=0?"checked":"";

                            if(typeof(v.id)!='undefined'){
                                html+="<label><input type='checkbox' name='"+cname+"[]' "+checked+" value='"+v.id+"'> "+v.name+"</label>";
                            }else if(typeof(v.key)!='undefined'){
                                html+="<label><input type='checkbox' name='"+cname+"[]' "+checked+" value='"+v.key+"'> "+v.value+"</label>";
                            }
                        });
                        me.empty().html(html);
                    }else if( control.toUpperCase()=="RADIO"){
                        $.each(res.data,function(i,v){
                            var vv = typeof(v.id)!='undefined'?v.key:v.id;
                            var checked = defaultValue.indexOf(vv)>=0?"checked":"";

                            if(typeof(v.id)!='undefined'){
                                html+="<label><input type='radio' name='"+cname+"' "+checked+" value='"+v.id+"'> "+v.name+"</label>";
                            }else if(typeof(v.key)!='undefined'){
                                html+="<label><input type='radio' name='"+cname+"' "+checked+" value='"+v.key+"'> "+v.value+"</label>";
                            }
                        });
                        me.empty().html(html);
                    }

                    if(callback!=""){
                        eval(callback);
                    }

                }else{
                    tip(res.message,"初始化失败","error");
                }
            },
            error:function(xhr,status,err){
                var loadError ="Error: "+xhr.status+": "+xhr.statusText;
                if(xhr.status==401){
                    loadError = "登录已过期或权限被去除!";
                }else if(xhr.status==404){
                    loadError = "请求的URL不存在!"+url;
                }
                tip(loadError,"提示","error");
            }
        });
    });
}
