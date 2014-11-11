// Category View
// =============
define([
	"jquery",
	"backbone",
    "IScrollLoadData"
], function( $, Backbone,IScrollLoadData ) {
    "use strict";
    
    var View = Backbone.View.extend( {
        initialize: function() {
        },
        events: {
          "touchstart #tt1":  "tt1",
        },          
        onCreate:function(){
            alert(this.viewName);
            alert(this.params);
            return true;
            /*
            $.mobile.changePage("#"+viewName, {
                reverse: false,
                changeHash: false
            });
            */
        },
        onResume:function(){

        },
        onJs:function(){

        },
        tt1:function(e){
            T.redirect("#main");            
        }
    } );
    return View;

} );