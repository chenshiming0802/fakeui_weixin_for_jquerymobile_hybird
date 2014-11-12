/*项目公共的Tools使用类,具有其他项目使用的特性*/
var T = {
    /*for loadUI*/
    _showLoadView: function() {
        window.showLoadView_elt = null;
        if (document.createElement && document.getElementById) {
            var dbg = document.createElement("div");
            dbg.id = "nd-bdg";
            dbg.className = "loadView-bg";

            var dgc = document.createElement("div");
            dgc.className = "loadView-cont";
            dgc.appendChild(dbg);

            //adjust positioning if body has a margin
            if (document.body.offsetLeft > 0)
                dgc.style.marginLeft = document.body.offsetLeft + "px";
            document.body.appendChild(dgc);

            window.showLoadView_elt = dgc;
        }
    },
    /*for loadUI*/
    _hideLoadView: function() {
        if (window.showLoadView_elt) {
            window.showLoadView_elt.style.display = "none";
            window.showLoadView_elt.parentNode.removeChild(window.showLoadView_elt);
        }
    },
    /*loader界面-模式窗口 isLoad:true/false */
    loadUI: function(isLoad) {
        if (isLoad) {
            this._showLoadView();
            $.mobile.loading("show", {
                text: "正在努力加载数据",
                textVisible: true,
                theme: "b"
            });            
        } else {
            $.mobile.loading('hide');
            this._hideLoadView();
        }
    },

    getTpl:function(el){
        var tpl = el.clone();
        tpl.removeClass("_tpl");
        return tpl;
    },
    scolllUI:function(IScrollLoadData,viewName,pullDown,pullUp){
        setTimeout(function(){      
            new IScrollLoadData(
                    document.querySelector('#'+viewName+' .spr_body'),
                    document.querySelector('#'+viewName+' ul'),
                    pullDown,
                    pullUp,
                    30
                );
        }, 500);  
    },
    /*增加点击后的UI显示效果*/
    pressDisplay:function(obj,className){
        className = className||"gc_b2";

        obj.bind("touchstart",function(){
            $(this).addClass("gc_b2");
        });
        obj.bind("touchend",function(){
            $(this).removeClass("gc_b2");
        }); 
    },
    repeatStr:function(count,str,sep){/*次数,字符串,间隔符*/
        var ret = "";
        for(var i=0;i<count;i++){
            ret += str;
        }
        return ret;
    },
    alert:function(message){
        window.alert(message);
    },
    goBack:function(){
        window.history.back();
    },
    go:function(url){
        var anchor = document.getElementById("a1");
        anchor.setAttribute("href", url);
        anchor.click();        
        /*
        $.mobile.navigate(url, {
            transition: "slide"         
        });
        */  
            
    },

    //显示所有的数据内容，view最后必须调用该代码以显示数据
    display:function(view){
        view.$el.find(".fade").css("display","block");
    },
    assertParamsLength:function(params,length){
        if(params.length<length){
            var errorMessage = "本页面参数错误，应该长度为:"+length;
            alert(errorMessage);
            throw new Error(0,errorMessage);
        }
    },
    assertNotNull:function (o,errorMessage){
        if(o==null||o==''){
            alert(errorMessage);
            throw new Error(0,errorMessage);
        }
    },

    /**
    打印日志
    */
    log:function (str){
        console.log(str);
    },

    /**
    json转string，通常用于打印日志用
    */
    json2str:function (o) {
        var arr = [];
        var currentT = this;
        var fmt = function(s) {
            if (typeof s == 'object' && s != null) return currentT.json2str(s);
            return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
        }
        for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
        return '{' + arr.join(',') + '}';
    },

    /**
    通过代理获取serviceName的数据
    usage:
        var that = this;
        var servcieName = "buginfos2.php";
        var posts = {
            pageIndex:"1",
            pageSize:"10",
            isAssignMe:"1"
        };
        var successFunction = function(json){
            if(json.resultFlag=="0"){
                that.render(new Backbone.Collection(json.datas));
            }                
        }
        T.getRemoteJsonByProxy(this,servcieName,posts,successFunction,null);
    */
    getRemoteJsonByProxy:function (that,serviceName,posts,successFunction,errorFunction){
        var baseUrl = "http://testenv.bsp.bsteel.net/baosteel_cas2/service_proxy2.jsp";
        var url = baseUrl + "?_SERVICE_=" + serviceName;
        return this.getRemoteJson(that,url,posts,successFunction,errorFunction);
    },
    getRemoteJson:function (that,url,posts,successFunction,errorFunction){
        this.log("getRemoteJson#url="+url);
        this.log("getRemoteJson#posts="+this.json2str(posts));
        //如果没有传入失败的funciton，则默认处理
        if(errorFunction==null){
            errorFunction = function(errorCode,errorMessage){
                alert("errorCode="+errorCode+";errorMessage="+errorMessage);
            }
        }
        //加载load界面
        $.mobile.loading( "show" );
        //调用远端数据
        //alert(localStorage.ucore1);
        var currentT = this;
        $.ajax({
            type: "POST",
            url: url,
            dataType: "JSON",
            data:posts,
            error: function(XHR, textStatus, errorThrown) {
                currentT.log("getRemoteJson#sr#exception="+XHR);
                errorFunction(textStatus,errorThrown);
                $.mobile.loading('hide');
            },
            success: function(json, textStatus) {
                currentT.log("getRemoteJson#sr#sr="+currentT.json2str(json));
                if (json == null || json.resultFlag == null || json.resultFlag != '0') {
                    errorFunction(json.resultMessageCode, json.resultMessage);
                } else {
                    //数据返回正常
                    successFunction(json);
                }
                $.mobile.loading('hide');
            },
            headers: {
                //"ucore1": "ADE1C062E16EAB4AACA11F7F89053FFD"
                "ucore1": localStorage.ucore1
            } //TODO LOGIN UCORE1               
        });
    },


    //status： 3正在加载中 2加载结束触发 1加载结束
    loading:function (status){
        switch(status){
            case 3:
                $.mobile.loading('show', {
                    text: '正在努力与后台交互数据，亲耐心等待！',  
                    textVisible: true, 
                    theme: 'b', 
                    textonly: true,   
                    html: ""
                });     
                break;
            case 2:
                $.mobile.loading('show', {
                    text: '交互完成，请继续操作！',  
                    textVisible: true, 
                    theme: 'b', 
                    textonly: true,   
                    html: ""
                });     
                setTimeout("loading(1)",1000);  
                break;          
            case 1:
                $.mobile.loading('hide');       
                break;          
        }
    }   
}


String.prototype.replaceAll = function (s1, s2) { 
    return this.replace(new RegExp(s1,"gm"),s2);
}