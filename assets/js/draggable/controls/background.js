var BOLDGRID = BOLDGRID || {};
BOLDGRID.EDITOR = BOLDGRID.EDITOR || {};
BOLDGRID.EDITOR.CONTROLS = BOLDGRID.EDITOR.CONTROLS || {};

( function ( $ ) {
	"use strict";

	var self,
		BG = BOLDGRID.EDITOR;

	BOLDGRID.EDITOR.CONTROLS.Background = {

		name : 'background',


		priority : 80,

		iconClasses : 'genericon genericon-gallery',

		selectors : [ '.boldgrid-section' ],

		init : function () {
			BOLDGRID.EDITOR.Controls.registerControl( this );
		},

		panel : {
			title : 'Background',
			height : '500px',
			width : '300px',
			scrollTarget : '.presets',
			sizeOffset : -170,
		},

		onMenuClick : function ( e ) {
			self.openPanel();
		},


		setup : function () {
			self._setupBackgroundClick();
		},

		centerImages : function () {
			//setTimeout( function () {
				$( '.presets img, .current-selection img' ).each( function () {
					var $this = $( this ),
						imageHeight = $this.height(),
						parentHeight = $this.parent().height(),
						heightDiff = imageHeight- parentHeight;
					console.log( heightDiff, parentHeight, imageHeight );
					$this.css( 'top', - ( heightDiff / 2 ) );

				} );
			//}, 300 );
		},

		_setupBackgroundClick : function() {
			var panel = BG.Panel;

		/*	panel.$element.on( 'click', '.panel-selection', function () {
				$.get('https://source.unsplash.com/featured/', {}, function(response, status, request) {
					console.log( request )
					});
			} );*/
		},

		openPanel : function () {
			var panel = BOLDGRID.EDITOR.Panel,
				template = wp.template( 'boldgrid-editor-background' );


			// Remove all content from the panel.
			panel.clear();

			panel.$element.find('.panel-body').html( template() );

			panel.$element.find('.panel-body').imagesLoaded( {}, function() {
				self.centerImages();
			} );

			// Open Panel.
			panel.open( self );
		}

	};

	BOLDGRID.EDITOR.CONTROLS.Background.init();
	self = BOLDGRID.EDITOR.CONTROLS.Background;

} )( jQuery );