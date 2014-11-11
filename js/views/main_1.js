// Category View
// =============
define([
	"jquery",
	"backbone"
], function( $, Backbone,jquerymobile ) {
    
    var View = Backbone.View.extend( {
        initialize: function() {
        },
        onCreate:function(){
            return true;
        },
        onResume:function(){
        },
        onJs:function(){
            var that = this;
            T.log(this.$el.find("#main_1_back"));
            this.$el.find("#main_1_back,#main_1_back_i").bind("tap",function(){
                T.goBack();
            });   
        },
    } );
    return View;

} );