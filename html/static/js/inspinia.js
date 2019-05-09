/*
 *
 *   INSPINIA - Responsive Admin Theme
 *   version 2.8
 *
 */

var remoteHost ="https://wgenerator.51dmai.com";
function getToken() {
    return "Bearer "+ window.localStorage.getItem("token");
}

$(document).ready(function () {

    // Fast fix bor position issue with Propper.js
    // Will be fixed in Bootstrap 4.1 - https://github.com/twbs/bootstrap/pull/24092
    Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;
    $.ajaxSetup({
        beforeSend:function(request){
            request.setRequestHeader("Authorization",getToken());
        }
    });

    // Add body-small class if window less than 768px
    if ($(window).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }

    // MetisMenu
    // var sideMenu = $('#side-menu').metisMenu();

    // sideMenu.on('shown.metisMenu', function (e) {
    //     fix_height();
    // });

    // Collapse ibox function
    $('.collapse-link').on('click', function (e) {
        e.preventDefault();
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.children('.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.close-link').on('click', function (e) {
        e.preventDefault();
        var content = $(this).closest('div.ibox');
        content.remove();
    });

    // Fullscreen ibox function
    $('.fullscreen-link').on('click', function (e) {
        e.preventDefault();
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        $('body').toggleClass('fullscreen-ibox-mode');
        button.toggleClass('fa-expand').toggleClass('fa-compress');
        ibox.toggleClass('fullscreen');
        setTimeout(function () {
            $(window).trigger('resize');
        }, 100);
    });

    // Close menu in canvas mode
    $('.close-canvas-menu').on('click', function (e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });

    // Run menu of canvas
    $('body.canvas-menu .sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
    });

    // Open close right sidebar
    $('.right-sidebar-toggle').on('click', function (e) {
        e.preventDefault();
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Initialize slimscroll for right sidebar
    $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
    });

    // Open close small chat
    $('.open-small-chat').on('click', function (e) {
        e.preventDefault();
        $(this).children().toggleClass('fa-comments').toggleClass('fa-times');
        $('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4
    });

    // Small
    $('.check-link').on('click', function () {
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-completed');
        return false;
    });

    // Append config box / Only for demo purpose
    // Uncomment on server mode to enable XHR calls
    //$.get("skin-config.html", function (data) {
    //    if (!$('body').hasClass('no-skin-config'))
    //        $('body').append(data);
    //});

    // Minimalize menu
    $('.navbar-minimalize').on('click', function (event) {
        event.preventDefault();
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();

    });

    // Tooltips demo
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });


    // Move right sidebar top after scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    $("[data-toggle=popover]")
        .popover();

    // Add slimscroll to element
    $('.full-height-scroll').slimscroll({
        height: '100%'
    })

    // $("#myModal5").modal({"backdrop":'static',"keyboard":false,"show":false});
    // $("#myModal5").modal('hide');
    $("#myModal5").on('hidden.bs.modal', function (e) {
        $("#myModal5 .modal-content").html("");
    });

});



// Fixed Sidebar
$(window).bind("load", function () {
    if ($("body").hasClass('fixed-sidebar')) {
        $('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9
        });
    }
});

function fix_height() {
    var heightWithoutNavbar = $("body > #wrapper").height() - 62;
    $(".sidebar-panel").css("min-height", heightWithoutNavbar + "px");

    var navbarheight = $('nav.navbar-default').height();
    var wrapperHeight = $('#page-wrapper').height();

    if (navbarheight > wrapperHeight) {
        $('#page-wrapper').css("min-height", navbarheight + "px");
    }

    if (navbarheight < wrapperHeight) {
        $('#page-wrapper').css("min-height", $(window).height() + "px");
    }

    if ($('body').hasClass('fixed-nav')) {
        if (navbarheight > wrapperHeight) {
            $('#page-wrapper').css("min-height", navbarheight + "px");
        } else {
            $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
        }
    }
    $('#main-content').css("min-height", $(window).height() - 140 + "px");
}

$(window).bind("load resize scroll", function () {

    // Full height of sidebar
    setTimeout(function(){
        if (!$("body").hasClass('body-small')) {
            fix_height();
        }
    })

});

// Minimalize menu when screen is less than 768px
$(window).bind("resize", function () {
    // console.log("main window resize");
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
    setTimeout(refreshTabContent,400);
});

// Local Storage functions
// Set proper body class and plugins based on user configuration
$(document).ready(function () {
    if (localStorageSupport()) {

        var collapse = localStorage.getItem("collapse_menu");
        var fixedsidebar = localStorage.getItem("fixedsidebar");
        var fixednavbar = localStorage.getItem("fixednavbar");
        var boxedlayout = localStorage.getItem("boxedlayout");
        var fixedfooter = localStorage.getItem("fixedfooter");

        var body = $('body');

        if (fixedsidebar == 'on') {
            body.addClass('fixed-sidebar');
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }

        if (collapse == 'on') {
            if (body.hasClass('fixed-sidebar')) {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }
            } else {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }

            }
        }

        if (fixednavbar == 'on') {
            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
            body.addClass('fixed-nav');
        }

        if (boxedlayout == 'on') {
            body.addClass('boxed-layout');
        }

        if (fixedfooter == 'on') {
            $(".footer").addClass('fixed');
        }
    }
});

// check if browser support HTML5 local storage
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}

// For demo purpose - animation css script
function animationHover(element, animation) {
    element = $(element);
    element.hover(
        function () {
            element.addClass('animated ' + animation);
        },
        function () {
            //wait for animation to finish before removing classes
            window.setTimeout(function () {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

function SmoothlyMenu() {
    //console.log("收缩工具栏按钮","SmoothlyMenu");
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        console.log("收缩工具栏按钮","1");
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400,refreshTabContent);
            }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        console.log("收缩工具栏按钮","2");
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400,refreshTabContent);
            }, 100);
    } else {
        console.log("收缩工具栏按钮","3");
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
        setTimeout(refreshTabContent,400);
    }
}

//刷新当前tab里的宽度
function refreshTabContent(){
    var currentTabContent =$(".J_iframe:visible");
    if(currentTabContent.length>0){
        //315= header(61)+tab(40)+footer(40)+上下padding(30)+theader(35)+pager(30)+ queryBar(x+10空白)
        var gridHeihgt = $(window).height() - 235;
        if($(".ibox-title",currentTabContent).length>0){
            gridHeihgt -=$(".ibox-title",currentTabContent).outerHeight();
        }
        var mainContentWidth = $("#main-content").width();
        currentTabContent.css("width",mainContentWidth);
        var jqGridBoxId = currentTabContent.find(".ui-jqgrid").attr("id");
        if(jqGridBoxId!=null && jqGridBoxId!=''){
            jqGridBoxId = jqGridBoxId.replace("gbox_","");
            var grid = $("#"+jqGridBoxId,currentTabContent);
            var colId = jqGridBoxId.replace("_table","_col");
            var gridCol = $("#"+colId,currentTabContent);
            if(gridCol.length>0){
                mainContentWidth = mainContentWidth * parseFloat(gridCol.data("percent"));
            }


            grid.setGridWidth(mainContentWidth-30,true).setGridHeight(gridHeihgt);
        }
    }
}

function refreshGridHeight(){
    var currentTabContent =$(".J_iframe:visible");
    if(currentTabContent.length>0){
        //315= header(61)+tab(40)+footer(40)+上下padding(30)+theader(35)+pager(30)+ queryBar(x+10空白)
        var gridHeihgt = $(window).height() - 235;
        if($(".ibox-title",currentTabContent).length>0){
            gridHeihgt -=$(".ibox-title",currentTabContent).outerHeight();
        }
        var jqGridBoxId = currentTabContent.find(".ui-jqgrid").attr("id");
        if(jqGridBoxId!=null && jqGridBoxId!=''){
            jqGridBoxId = jqGridBoxId.replace("gbox_","");
            var grid = $("#"+jqGridBoxId,currentTabContent);
            var colId = jqGridBoxId.replace("_table","_col");
            var gridCol = $("#"+colId,currentTabContent);
        

            grid.setGridHeight(gridHeihgt);
        }
    }
}

// Dragable panels
function WinMove() {
    var element = "[class*=col]";
    var handle = ".ibox-title";
    var connect = "[class*=col]";
    $(element).sortable(
        {
            handle: handle,
            connectWith: connect,
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            opacity: 0.8
        })
        .disableSelection();
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
//打开窗体
function openWindow(url,options,sizeCls){
    if(typeof sizeCls == 'undefined'){
        sizeCls = 'modal-lg';
    }
    $("#myModal5 .modal-dialog").attr("class","modal-dialog "+sizeCls);
    reloadWindow(getUrl(url),options);
    // $("#myModal5 .modal-content").load(url,options,function(data,status,xhr){
    //     // console.log("modal content load complete;",url);
    //     if(status=="success"){
    //         if(typeof ModalLoadReady == 'function'){
    //             ModalLoadReady();
    //         }
    //     }else{
    //
    //         var loadError ="Error: "+xhr.status+": "+xhr.statusText;
    //         if(xhr.status==401){
    //             loadError = "登录已过期或权限被去除!";
    //         }else if(xhr.status==404){
    //             loadError = "请求的URL不存在,"+url;
    //         }
    //         var errorHtml = '<div class="modal-header">\n' +
    //             '    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n' +
    //             '    <h4 class="modal-title zdy">错误</h4>\n' +
    //             '    </div>\n' +
    //             '    <div class="modal-body">\n' + loadError+
    //             '    </div>';
    //         $("#myModal5 .modal-content").html(errorHtml);
    //     }
    // });
    $("#myModal5").modal('show');
}

function reloadWindow(url,options){
    var info = {};
    if(typeof(url)=='undefined'){
        info = $("#myModal5 .modal-content").data("info");
        if(typeof info != 'object'){
            info = JSON.parse(info);
        }
        url = info.url;
        options = info.options;
    }else{
        info.url = url;
        info.options = options;
    }

    //console.log(info);

    $("#myModal5 .modal-content").data("info",info);
    $("#myModal5 .modal-content").load(url,options,function(data,status,xhr){
        // console.log("modal content load complete;",url);
        if(status=="success"){
            $("#myModal5 .modal-title").on("dblclick",function(){
                reloadWindow();
            });
            if(typeof ModalLoadReady == 'function'){
                ModalLoadReady();
            }
        }else{

            var loadError ="Error: "+xhr.status+": "+xhr.statusText;
            if(xhr.status==401){
                loadError = "登录已过期或权限被去除!";
            }else if(xhr.status==404){
                loadError = "请求的URL不存在,"+url;
            }
            var errorHtml = '<div class="modal-header">\n' +
                '    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n' +
                '    <h4 class="modal-title zdy">错误</h4>\n' +
                '    </div>\n' +
                '    <div class="modal-body">\n' + loadError+
                '    </div>';
            $("#myModal5 .modal-content").html(errorHtml);
        }
    });
}

//关闭窗体
function closeWindow(){
    $("#myModal5").modal('hide');
}

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

    if(url.indexOf("http://")<=0 && url.indexOf("https://")<=0){
        url = remoteHost+url;
    }

    $.ajax({
        url: url,
        type: method || "GET",
        dataType: "json",
        data: JSON.stringify(formItemObject),
        contentType:"application/json",  //缺失会出现URL编码，无法转成json对象
        beforeSend: function(request) {
            request.setRequestHeader("Authorization",getToken());
        },
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
                if(options.closeModal){
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

function mountGrid(options){
    //315= header(61)+tab(40)+footer(40)+上下padding(30)+theader(35)+pager(30)+ queryBar(x+10空白)
    //options.container="#user_list_container"
    var gridHeihgt = $(window).height() - 235 - $(".ibox-title",$(options.container)).outerHeight();
    if(gridHeihgt<100){
        gridHeihgt=300;
    }
    // var gridWidth = $('#main-content').width()-30;
    // console.log("first log width and height by ajax load html",gridWidth,gridHeihgt);
    //options.id = "#user_list_table"
    if(options.url.indexOf("http://")<=0 && options.url.indexOf("https://")<=0){
        options.url = remoteHost+options.url;
    }
    $(options.id).jqGrid({
        url: options.url,//'/api/sm/getUsers',
        datatype: "json",
        ajaxGridOptions: {contentType: 'application/json; charset=utf-8'},
        mtype:'POST',
        postData: typeof(options.queryData)!='undefined'?options.queryData: {}, //$("#user_list_search_form").serializeJSON(),
        serializeGridData: function (data) {
            return JSON.stringify(data);
        },
        height: gridHeihgt,
        // width: gridWidth,
        scrollOffset:18,
        emptyrecords:'暂无数据',
        autowidth: typeof(options.autoWidth)!='undefined'?options.autoWidth : true,
        shrinkToFit: true,
        rowNum: typeof(options.rowNum)!='undefined'?options.rowNum : 20,
        rowList: [10, 20,50,100],
        colNames: options.header, //['编号','用户名', '昵称', '姓名','手机号','状态','创建时间'],
        colModel: options.columns, //[{name:'id',index:'id',  width:60, sorttype:"int",search:true}, {name:'userName',index:'userName',  width:90,align:"center"}, {name:'nickName',index:'nickName',  width:100,align:"center"}, {name:'realName',index:'realName', width:80, align:"center"}, {name:'mobile',index:'mobile',  width:80, align:"center"}, {name:'enable',index:'enable', width:80,align:"center",sorttype:"int"}, {name:'created',index:'created', width:100, sortable:false,formatter:'date'} ]
        pager: options.pager ,//"#user_list_pager",
        viewrecords: true,
        // caption: "Example jqGrid 2",
        hidegrid: false,
        jsonReader : {
            root:"data.list",
            page: "data.pagination.current",
            total: "data.pagination.pages",
            records: "data.pagination.total",
            cell: "",
            id: "0"
        },
        loadBeforeSend: function(request) {
            request.setRequestHeader("Authorization",getToken());
        },
        multiselect: typeof(options.multiSelect)!='undefined'? options.multiSelect:true,
        loadError: function(xhr,status,error){
            if (xhr.status == 401) {
                tip("登录已过期,或无权访问","错误","error");
            }else if (xhr.status == 404) {
                tip("请求Url["+options.url+"]不存在","错误","error");
            }
            else{
                tip("错误:"+error,"错误","error");
            }
        },
        loadComplete: function (data) {
            // console.log("grid load complete",data);
            if(!data.success){
                tip(data.message,"加载列表错误","error");
            }else{

                var btns = "<div class=\"col-sm\" style=\"padding-left:0px;\">";
                if(typeof(data.operates)!='undefined'){
                    $.each(data.operates.list,function(i,v){
                        if(v.showInBar==1){
                        btns += '<button class="btn btn-sm '+v.btnType+'" onclick="'+v.groupName+'.'+v.jsMethod+'">';
                        btns += '<i class="fa '+v.icon+'"></i>&nbsp;'+v.powerTitle+'</button>';
                        }                        
                    });
                }
                btns+="</div>"
                $(".operate-bar",$(options.container)).html(btns);
                refreshGridHeight();
            }
        }
    });

    // setTimeout(function(){
    //     $('.wrapper-content').removeClass('animated fadeInRight');
    // },700);
}


function initFormRemoteData(formId){
    $('.chosen-select',$(formId)).chosen({width: "100%",disable_search:true});
    $(formId).find("[data-url]").each(function() {
        var me = $(this);
        var url = $(this).data("url");


        if(url.indexOf("http://")<=0 && url.indexOf("https://")<=0){
            url = remoteHost+url;
        }

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
            beforeSend: function(request) {
                request.setRequestHeader("Authorization",getToken());
            },
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
                            console.log("设置默认值");
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

function getGridSelectIds(id){
    return $(id).jqGrid("getGridParam","selarrrow");
}

function getUrl(url){
    if(url.indexOf("/view")>=0){
        var newUrl = "";
        switch(url){
            case "/view/ormList":
                newUrl = "tm/ormList.html"
                break;
            case "/view/readme":
                newUrl = "common/readme.html"
                break;
            case "/view/findSql":
                newUrl = "common/findSql.html"
                break;
            case "/view/vtl":
                newUrl = "common/vtl.html"
                break; 
             case "/view/define":
                newUrl = "common/define1.html"
                break;             
            case "/view/myTemplates":
                newUrl = "my/templateList.html"
                break;
            case "/view/buildCode":
                newUrl = "tm/buildCode.html"
                break;       
            case "/view/groups":
                newUrl = "my/templateGroup.html"
                break;  
            case "/view/myFeedback":
                newUrl = "my/feedbackList.html"
                break;  
            case "/view/ormEdit":
            case "/view/ormBatchEdit":
            case "/view/userDetail":
            case "/view/modifyPwd":
            case "/view/myTemplateEdit":
                newUrl = remoteHost+url;
                break;                   
            default:
                newUrl = url;
                break;
        }

        return newUrl;
    }
    if(url.indexOf("http://")<=0 && url.indexOf("https://")<=0){
        url = remoteHost+url;
    }
    return url;
}

function myAjax(url,data,successCallback,errorCallback){
    $.ajax({
        url: getUrl(url),
        type: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        contentType:"application/json",  //缺失会出现URL编码，无法转成json对象
        beforeSend: function(request) {
            request.setRequestHeader("Authorization",getToken());
        },
        success:function(res){
            successCallback(res);
        },
        error:function(xhr,status,err){
            var loadError ="Error: "+xhr.status+": "+xhr.statusText;
            var statusCode = xhr.status;
            if(xhr.status==401){
                loadError = "登录已过期或权限被去除!"
                if(url=="/logout1"){
                    document.location.href="/login.html";
                    return;
                }
            }else if(xhr.status==404){
                loadError = "请求的URL不存在!"+url;
            }
            if(typeof errorCallback=='function'){
                errorCallback(statusCode,loadError);
            }
        }
    });
}

function myConfirm(msgText,okBtnText,callback){
    swal({
        title: "提示",
        text: typeof(msgText)=='undefined'? "行为有风险,是否继续?":msgText,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: okBtnText|| "是的,继续",
        closeOnConfirm: true,
        icon:''
    }, function (isConfirm) {
        callback(isConfirm);
    });
}

function myAlert(message,title,type){
    var swalOptions = {
        title: typeof(title) == 'undefined'? "提示":title,
        text: typeof(message)=='undefined' ? "你什么也没有说!":message,
        type: typeof(type) == 'undefined'? "success": type
    };
    swal(swalOptions);
}
//--------jqGrid--------
function formatEnable(cellvalue, options, rowObject) {
    if(cellvalue==1){
        return '<span class="label label-primary"><i class="fa fa-check"></i></span>';
    }
    return '<span class="label label-danger"><i class="fa fa-lock"></i></span>';
}
function formatYesNo(cellvalue, options, rowObject) {
    if(cellvalue==1){
        return '<span class="label label-primary">Yes</span>';
    }
    return '<span class="label label-warning">No</span>';
}
function formatAvator(cellvalue,options,row){
    if(cellvalue==null || cellvalue==''){
        return "";
    }
    return "<img src=\""+cellvalue+"\" style=\"width:50px;max-height:50px;\"/>";
}

jQuery.extend($.fn.fmatter , {
    formatEnable : function(cellvalue, options, rowobject) {
        return formatEnable(cellvalue,options,rowobject);
    },
    formatYesNo : function(v,options,row){
        return formatYesNo(v,options,row);
    },
    formatAvator : function(v,options,row){
        return formatAvator(v,options,row);
    }
});

function getGridSelect(tid,msg,multi){
    var ids = getGridSelectIds(tid);
    if(ids==null || ids.length<=0){
        tip((msg|| "请先选中要编辑的行!"),"","error");
        return null;
    }
    var rows = [];
    var isMulti = multi || false;
    $.each(ids,function(i,v){
        rows.push($(tid).jqGrid('getRowData',v));
        if(!isMulti){
            return false;
        }
    });
    return isMulti?rows:rows[0];
}

function refreshGrid(tid,fid){
    var ulsData = $(fid).serializeJSON();
    $(tid).jqGrid('setGridParam',{
        datatype:'json',
        postData: ulsData, //发送数据
        page:1
    }).trigger("reloadGrid");
}

function refreshTab(){
    $(".J_tabRefresh").click();
}

function advanceReset(target) {
    // console.log("ressssettt");
    $('.chosen-select',$(target)).trigger('change');
    setTimeout(function(){
        $('.chosen-select',$(target)).trigger('chosen:updated');
    },500);

}
function initTabSorter() {
    $( ".page-tabs-content" ).sortable({ stop: function(event, ui) {
            var tid = $(ui.item[0]).data("code");
            setTimeout(function(){
                if($.trim(tid)==""){
                    $("#handler_tab_a").click();
                }else{
                    $(".J_menuItem[data-code='"+tid+"']").click();
                }
            },300);
        } }).disableSelection();
}

function initPageFields(cid,tid,pageFields){
    $("ul.list-menu",$(cid)).sortable({ stop: function(event, ui) {
            //var tid = $("a",$(ui.item[0])).data("code") ;
            //console.log(tid);
            //console.log(cols.indexOf(tid));
            setTimeout(function(){
                var arr = [];
                var newCols = [];
                $("div.dropdown-menu a",$(cid)).each(function(i,v){
                    //console.log(v);
                    var c = $(this).data("code");
                    arr.push(pageFields.indexOf(c));
                    newCols.push(c);
                });
                pageFields = newCols;
                // console.log(arr);
                $(tid).remapColumns(arr,true,false);
            },500);

        } }).disableSelection();
}

function savePageFields(source){
    var container = $(source).parent().parent();
    var menuCode = container.data("mc");
    var arr = [];
    $("a",container).each(function(i,v){
        var c = $(this).data("code");
        if(c!=""){
            arr.push(c);
        }
    });
    var fields = arr.join(",");
    myAjax("/api/sm/saveUserCol",{
        menuCode: menuCode,
        content: fields
    },function(res){
        if(res.success){
            tip("页面自定义成功","提示","success");
        }else{
            tip(res.message);
        }
    },function(statusCode,errorMsg){
        tip(errorMsg);
    });
}


function resetPageFields(source){
    var container = $(source).parent().parent();
    var menuCode = container.data("mc");
    myConfirm("确定要继续重置页面信息吗?","继续",function (flag) {
        if(!flag){return;}
        myAjax("/api/sm/resetUserCol",{
            menuCode: menuCode,
        },function(res){
            if(res.success){
                tip("页面重置成功","提示","success");
            }else{
                tip(res.message);
            }
        },function(statusCode,errorMsg){
            tip(errorMsg);
        });
    });

}
