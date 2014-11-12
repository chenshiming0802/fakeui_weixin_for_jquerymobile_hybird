// Mobile Router
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
    "../views/testpage",
    "../views/main",
    "../views/main_1"   
], function( $, Backbone, 
    testpage,
    main,
    main_1 ) {
    "use strict";
    // Extends Backbone.Router
    var CategoryRouter = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {
            Backbone.history.start();
        },
        routes: {
            "": "index",
            ":viewName": "view",
            ":viewName/:param": "view"

        },
        _createView: function(viewName, param) {
            //var viewClass = viewName.substring(0, 1).toUpperCase() + viewName.substring(1, viewName.length) + "";
            var viewClass = viewName;
            var obj = {};
            obj.__proto__ = eval(viewClass).prototype;
            //alert(viewClass+"/"+obj+"/"+param);
            eval(viewClass).call(obj, param);
            //viewCache[viewName] = obj;
            return obj;
        },          
        index: function() {
            setTimeout(
                "T.go('#main')",
                3000
            );
            //$.mobile.changePage( "#index" , { reverse: false, changeHash: false } );
        },
        view: function(viewName, param) {
            var params;
            if (param == null || param == '') {
                params = new Array();
            } else {
                params = param.split(",");
            }
            T.log("create view-#" + viewName);

            var obj = this._createView(viewName, {
                el: "#" + viewName
            });   
            obj.viewName = viewName;
            obj.params = params;
            $.mobile.changePage( "#"+viewName, { transition: "slide",reverse: false, changeHash: false } );
            var loadRet = obj.onCreate();
            //如果onLoad返回是非True则不执行onResume
            if(loadRet===true){
                obj.onResume();
                obj.onJs();
            }
            T.log("view onload finish-#" + viewName);            
        } 
    } );

    // Returns the Router class
    return CategoryRouter;

} );