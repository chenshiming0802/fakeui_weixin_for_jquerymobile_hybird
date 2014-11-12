// Category View
// =============
define([
	"jquery",
	"backbone",
    "IScrollLoadData"
], function( $, Backbone,IScrollLoadData ) {
    "use strict";
    var View = Backbone.View.extend( {
        datas: [  
            {"title": "群聊", "pic": "images/tongxunlu/2.png"},
            {"title": "标签", "pic": "images/tongxunlu/3.png"},
            {"title": "公众号", "pic": "images/tongxunlu/4.png"},
            {"title": "寂寞", "pic": "images/tongxunlu/1.png"},
            {"title": "陈市明", "pic": "images/tongxunlu/0.png"}
        ],
        initialize: function() {
        },
        onCreate:function(){
            var page = $("#main_tongxunlu").clone();
            var iUl = page.find("#iUl");
            var iPic = iUl.find("#iPic");
            var iIit = iUl.find("#iIit"); 
            var sb = "";

            for(var i in this.datas){
                var model = this.datas[i];
                iPic.attr("src",model.pic);
                iIit.text(model.title);
                sb += iUl.html();   
            }
            iUl.html(sb);

            $("#main .spr_body").html(page.html());  

            new IScrollLoadData(
                document.querySelector('#main .spr_body'),
                document.querySelector('#main ul'),
                this.dropTopAction,
                this.dropBottomAction,
                30
            ); 
            T.scolllUI(IScrollLoadData,"main",null,null);        
            return true;
        },
        onResume:function(){
            //alert('hi');
        },
        onJs:function(){
            
        }
    } );
    return View;

} );