
var smUserList = function(){
    var tid = "#user_list_table";
    var fid = "#user_list_search_form";
    function queryData(initData) {

        var opt={
            id: "#user_list_table",
            container: "#user_list_container",
            url: '/api/sm/getUsers',
            queryData: initData,
            header: ['编号','用户名','头像', '昵称', '姓名','角色','手机号','性别','职业',"省","市",'状态','创建时间'],
            columns:[
                {name:'id',index:'id',  width:60, sorttype:"int",search:true},
                {name:'userName',index:'user_name',  width:90,align:"center"},
                {name:'headerImage',index:'header_image',  width:90,align:"center",sortable:false,formatter:formatAvator},
                {name:'nickName',index:'nick_name',  width:100,align:"center"},
                {name:'realName',index:'real_name', width:80, align:"center"},
                {name:'roleName',index:'role_list', width:80, align:"center"},
                {name:'mobile',index:'mobile',  width:80, align:"center"},
                {name:'genderName',index:'gender',  width:80, align:"center"},
                {name:'professionName',index:'profession',  width:80, align:"center"},
                {name:'province',index:'province',  width:80, align:"center"},
                {name:'city',index:'city',  width:80, align:"center"},
                {name:'enable',index:'enable', width:80,align:"center",sorttype:"int",formatter:formatEnable},
                {name:'created',index:'created', width:100, sortable:false,formatter:'datetime'}
            ],
            pager: "#user_list_pager",
        };
        mountGrid(opt);
    }
    return {
        ready: function () {
            // console.log("pageName=userList");

            initFormRemoteData(fid);
            queryData();
        },
        add: function(){
            openWindow("/view/userEdit",{});
        },
        edit: function(){
            //获取所有数据
            var rowData = getGridSelect(tid,"请先选中行",false);
            if(rowData!=null){
                openWindow("/view/userEdit",{userName:rowData.userName});
            }
        },
        addReward: function(){
            //获取所有数据
            var rowData = getGridSelect(tid,"请先选中行",false);
            if(rowData!=null){
                openWindow("/view/addReward",{userName:rowData.userName});
            }
        },
        resetPwd:function(){
            var rowData = getGridSelect(tid,"请选择要重置密码的用户!",false);
            if(rowData!=null){
                myConfirm("您确定要重置用户["+rowData.userName+"]的密码吗？",null,function(isConfirm){
                    if(!isConfirm){return;}
                    myAjax("/api/sm/resetPwd",{userName:rowData.userName},function(res){
                        if(res.success){
                            if(res.data===""){
                                tip("密码修改成功","提示","success");
                            }else{
                                myAlert("密码重置成功,请复制或牢记!",res.data, "success");
                            }
                        }else{
                            tip(res.message);
                        }
                    },function(statusCode,errorMsg){
                        tip(errorMsg);
                    });
                });
            }
        },
        removeUser:function(){
            var rows = getGridSelect(tid,"请选择要删除的用户!",true);
            if(rows!=null){
                myConfirm("您确定要删除["+rows.length+"]个用户吗？",null,function(isConfirm){
                    if(!isConfirm){return;}
                    var ids = [];
                    $.each(rows,function(i,v){
                        ids.push(parseInt(v.id));
                    });
                    myAjax("/api/sm/removeUser",{ids:ids},function(res){
                        if(res.success){
                            tip("用户删除成功","提示","success");
                            smUserList.reloadGrid();
                        }else{
                            tip(res.message);
                        }
                    },function(statusCode,errorMsg){
                        tip(errorMsg);
                    });
                });
            }
        },
        forceOffline:function(){
            var rows = getGridSelect(tid,"请选择要强制下线的用户!",true);
            if(rows!=null){
                myConfirm("您确定要强制下线["+rows.length+"]个用户吗？",null,function(isConfirm){
                    if(!isConfirm){return;}
                    var ids = [];
                    $.each(rows,function(i,v){
                        ids.push(parseInt(v.id));
                    });
                    myAjax("/api/sm/forceOffline",{ids:ids},function(res){
                        if(res.success){
                            tip("用户已成功下线","提示","success");
                        }else{
                            tip(res.message);
                        }
                    },function(statusCode,errorMsg){
                        tip(errorMsg);
                    });
                });
            }
        },
        reloadGrid:function() {
            refreshGrid(tid,fid);
            return false;
        }
    };
}();