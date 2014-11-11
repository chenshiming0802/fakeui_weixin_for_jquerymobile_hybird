// Category View
// =============
define([
	"jquery",
	"backbone",
    "IScrollLoadData"
], function( $, Backbone,IScrollLoadData ) {
    "use strict";
    var tongxunluData = {
        "datas": [  
            {"title": "群聊", "pic": "images/tongxunlu/2.png"},
            {"title": "标签", "pic": "images/tongxunlu/3.png"},
            {"title": "公众号", "pic": "images/tongxunlu/4.png"},
            {"title": "寂寞", "pic": "images/tongxunlu/1.png"},
            {"title": "陈市明", "pic": "images/tongxunlu/0.png"}
            ]
    };
    var View = Backbone.View.extend( {
        initialize: function() {
        },
        onCreate:function(){
            var page = $("#main_faxian").clone();    
            $("#main .spr_body").html(page.html());    
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