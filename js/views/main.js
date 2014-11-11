// Category View
// =============
define([
	//"jquery",
	"backbone",
    "IScrollLoadData",
    "../views/main_weixin",
    "../views/main_tongxunlu",
    "../views/main_faxian",
    "../views/main_me",
//], function( $, Backbone, IScrollLoadData,
], function( Backbone, IScrollLoadData,
    weixin,
    tongxunlu,
    faxian,
    me
) {
    "use strict";


    var View = Backbone.View.extend( {
        _createView: function(viewName, param) {
            var viewClass = viewName;
            var obj = {};
            obj.__proto__ = eval(viewClass).prototype;
            //alert(viewClass+"/"+obj+"/"+param);
            eval(viewClass).call(obj, param);
            //viewCache[viewName] = obj;
            return obj;
        },
        initialize: function() {
            this.pp = null;
        },
        events: {
        },             
        onCreate:function(){ 
            //$.mobile.loadPage("#main"); 
            //alert('main');
            //$.mobile.changePage( "#main" );

            /*首页中的内页*/
            var ppName = this.params[0] || "weixin";   
            this.renderPp(ppName);          

            var that = this;
            $(this.$el.find("div.spr_footer span")).bind("touchstart",function(){ 
                var ppName = this.id;
                T.log("main click#"+ppName);
                that.renderPp(ppName);
            });
       
            return true;
        },
        onResume:function(){
            
        },
        onJs:function(){

        },
        /*显示body内容*/
        renderPp:function(ppName){    
            if(false){
                //如果点击tabs后不是弹出画面，则此处处理
            }
            var pp = this._createView(ppName,{});
            T.log("ppName="+ppName);
            this.f_b(ppName);
            pp.$el = this.$el;
            pp.$el_body = this.$el.find("div.spr_body");
            pp.$el_body.html($("div#main_"+ppName).html());
            pp.onCreate();
            pp.onResume();
            pp.onJs();
        },
        f_b:function(id){
            $("#"+id).addClass("co_pr");
            this.$el.find(".spr_footer span").removeClass("co_pr");
            $("#"+id).addClass("co_pr");
        }
    } );
    return View;

} );