// Category View
// =============
/**
页面名：footer的id名和params是一样的
必须有<div id="main_页面名">
this.$el 为main页面节点
this.$el_body 为main中的body节点

main页面会将该pp填入，因此可以通过this.$el.find找到
*/
define([
	"jquery",
	"backbone",
    "IScrollLoadData"
], function( $, Backbone,IScrollLoadData ) {
    "use strict";
    var View = Backbone.View.extend( {
        datas:[
            {"title": "腾信新闻", "body": "河南城管强拆与村民持续互殴", "pic": "images/weinxin/1.png","bud":"3"},
            {"title": "订阅号", "body": "创意者联盟：刚get到一种既省钱又...", "pic": "images/weinxin/2.png","time":"早上08:47","bud":"0"},
            {"title": "有道云笔记", "body": "大名鼎鼎的康奈尔笔记法和随手...", "pic": "images/weinxin/3.png","time":"晚上18:29","bud":"0"},
            {"title": "杭电00512", "body": "陈市明：...", "pic": "images/weinxin/4.png","time":"昨天","bud":"10"}            
        ],
        initialize: function() {
        },
        onCreate:function(){ 
            //$.ui.loadContent("#main_1",false,false,"slide");
            return true;
        },
        onResume:function(){
            var tpl = T.getTpl(this.$el_body.find("._tpl"))
            var iPic = tpl.find("#iPic");
            var iBud = tpl.find("#iBud");
            var iIit = tpl.find("#iIit"); 
            var iBod = tpl.find("#iBod");
            var iTim = tpl.find("#iTim");

            var sb = "";
            for(var i in this.datas){
                var model = this.datas[i];
                iPic.attr("src",model.pic);
                iIit.text(model.title);
                iBod.text(model.body);
                iTim.text(model.time);
                if(model.bud!="0"){
                    iBud.text(model.bud);
                    iBud.css("display","block");
                }else{
                    iBud.text(model.bud);
                    iBud.css("display","none");
                }  
                sb += tpl.prop("outerHTML");                    
            }
            this.$el_body.find("ul#iUl").append(sb);
        },
        onJs:function(){
            T.pressDisplay(this.$el.find("ul#iUl li"));  
            var that = this;
            T.scolllUI(IScrollLoadData,"main",
                function(){ 
                    setTimeout(that.onResume(),1000);   
                },
                function(){ 
                    setTimeout(that.onResume(),1000);
                }
            );     
            this.$el.find("ul#iUl li").bind("tap",function(){  
                T.go("#main_1");
            });             
        },
    } );
    return View;

} );