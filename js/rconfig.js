// Sets the require.js configuration for your application.
require.config( {

	baseUrl: "lib",

	// 3rd party script alias names
	paths: {

		// Core Libraries
		"jquery": "jquery.min",
		"jquerymobile": "jquery.mobile-1.4.4.min",
		"underscore": "lodash.min",
		"backbone": "backbone-min",
		'IScroll':'iscroll5/iscroll-probe',
		'IScrollLoadData':'iscroll5/iscroll-load-data'	,

		"backbone-requirejs": "../js",
		
	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim: {

		"backbone": {
			"deps": [ "underscore", "jquery" ],
			"exports": "Backbone"
		}

	}

});

// Includes File Dependencies
require([
	"jquery",
	"backbone",
	"backbone-requirejs/routers/mobileRouter"
], function ( $, Backbone, Mobile ) {
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false); 
	$( document ).on( "mobileinit",

		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function () {

			// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
			$.mobile.linkBindingEnabled = false;

			// Disabling this will prevent jQuery Mobile from handling hash changes
			$.mobile.hashListeningEnabled = false;
		}
	)

	require( [ "jquerymobile" ], function () {

		// Instantiates a new Backbone.js Mobile Router
		this.router = new Mobile();
	});
});
