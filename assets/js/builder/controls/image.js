var BOLDGRID = BOLDGRID || {};
BOLDGRID.EDITOR = BOLDGRID.EDITOR || {};
BOLDGRID.EDITOR.CONTROLS = BOLDGRID.EDITOR.CONTROLS || {};

( function ( $ ) {
	"use strict";

	var self,
		BG = BOLDGRID.EDITOR;

	BOLDGRID.EDITOR.CONTROLS.Image = {
			
		classes : BoldgridEditor.builder_config.image,

		name : 'image',

		tooltip : 'Image Design',

		priority : 80,

		iconClasses : 'fa fa-cog',

		selectors : [ 'img' ],

		init : function () {
			BOLDGRID.EDITOR.Controls.registerControl( this );
		},

		panel : {
			title : 'Image Design',
			height : '500px',
			width : '280px',
			includeFooter : true,
			customizeCallback : true,
			customizeLeaveCallback : true,
			customizeSupport : [ 'margin' ],
		},

		onMenuClick : function ( e ) {
			self.openPanel();
		},

		/**
		 * When the user clicks on an image, if the panel is open, set panel content.
		 */
		elementClick : function() {
			if ( BOLDGRID.EDITOR.Panel.isOpenControl( this ) ) {
				self.openPanel();
			}
		},

		/**
		 * Bind Handlers.
		 */
		setup : function () {
			self.validateComponentsUsed();
			self._setupPanelClick();
		},
		
		validateComponentsUsed : function () {
			$.each( BoldgridEditor.builder_config.components_used.image, function () {
				var $temp = $('<div>').attr( 'class', this.classes ); 
				$temp.removeClass (function ( index, css ) {
				    return ( css.match( /(^|\s)wp-image-\S+/g) || [] ).join( ' ' );
				} );
				
				this.classes = $temp.attr('class');
			} );
		},

		_setupPanelClick : function() {
			var panel = BOLDGRID.EDITOR.Panel;

			panel.$element.on( 'click', '.image-design .panel-selection', function () {
				var $this = $( this ),
					preset = $this.data( 'preset' ),
					$target = BOLDGRID.EDITOR.Menu.getTarget( self );
				
				// Remove Classes.
				$target.removeClass ( function ( index, css ) {
				    return (css.match (/(^|\s)bg-img-\S+/g) || []).join(' ');
				} );
				
				self.removeModClasses( $target );
				
				tinyMCE.activeEditor.selection.collapse( false );
				
				if ( $this.hasClass( 'selected' ) ) {
					panel.clearSelected();
				} else {
					panel.clearSelected();
					$target.addClass( preset );
					$this.addClass( 'selected' );
				}
			} );
		},
		
		removeModClasses : function ( $target ) {
			$target.parent( '[class^="mod-img"]' ).removeClass ( function ( index, css ) {
			    return (css.match (/(^|\s)mod-img-\S+/g) || []).join(' ');
			} );
		},

		preselectImage : function () {
			var $target = BG.Menu.getTarget( self ),
				imageClasses = $target.attr('class'),
				bgImageClasses = [];

			imageClasses = imageClasses ? imageClasses.split( ' ' ) : [];

			$.each( imageClasses, function () {
				if ( this.indexOf('bg-img') === 0 ) {
					bgImageClasses.push( this );
				}
			} );
			
			bgImageClasses = bgImageClasses.join(' ');
			
			if ( bgImageClasses ) {
				BG.Panel.$element.find( '[data-preset="' + bgImageClasses + '"]' ).addClass( 'selected' );
				return false;
			}
		},

		openPanel : function () {
			var panel = BOLDGRID.EDITOR.Panel,
				$target = BOLDGRID.EDITOR.Menu.getTarget( self ),
				template = wp.template( 'boldgrid-editor-image' );

			// Remove all content from the panel.
			panel.clear();

			// Set markup for panel.
			panel.$element.find( '.panel-body' ).html( template( {
				'src' : $target.attr( 'src' ),
				'presets' : self.classes,
				'myPresets' : BoldgridEditor.builder_config.components_used.image
			} ) );

			self.preselectImage();

			// Open Panel.
			panel.open( self );
		}

	};

	BOLDGRID.EDITOR.CONTROLS.Image.init();
	self = BOLDGRID.EDITOR.CONTROLS.Image;

} )( jQuery );