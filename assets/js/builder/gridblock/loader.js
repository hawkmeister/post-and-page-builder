var BOLDGRID = BOLDGRID || {};
BOLDGRID.EDITOR = BOLDGRID.EDITOR || {};
BOLDGRID.EDITOR.GRIDBLOCK = BOLDGRID.EDITOR.GRIDBLOCK || {};

(function( $ ) {
	'use strict';

	var BGGB = BOLDGRID.EDITOR.GRIDBLOCK,
		self = {

			$window: $( window ),

			openInit: false,

			countGidblocksLoaded: 0,

			/**
			 * Run this function the first time the view is open.
			 *
			 * @since 1.4
			 */
			firstOpen: function() {
				if ( false === self.openInit ) {
					self.openInit = true;
					BGGB.View.init();
					BGGB.Drag.init();
					BGGB.Remote.loadRemoteGridblocks();
				}
			},

			/**
			 * Remove the overlay that fades in the gridblocks.
			 *
			 * @since 1.4
			 */
			removeLoadingOverlay: function() {
				var minGridblocks = 9;

				self.countGidblocksLoaded++;
				if ( self.countGidblocksLoaded === minGridblocks ) {
					BGGB.View.$gridblockSection.find( '.gridblocks' ).removeClass( 'gridblock-loading' );
				}
			},

			/**
			 * Get a list of gridblocks that need to be rendered.
			 *
			 * @since 1.4
			 *
			 * @return {Array} List of gridblock keys to be rendered.
			 */
			getPendingGridblockIds: function() {
				var gridblockIds = [];

				$.each( BGGB.configs.gridblocks, function( index ) {
					if ( ! this.renderScheduled ) {
						this.renderScheduled = true;
						gridblockIds.push( index );
					}
				} );

				return gridblockIds;
			},

			/**
			 * Render any gridblock iframes that have yet to be loaded.
			 *
			 * @since 1.4
			 */
			loadGridblocks: function() {
				var interval, load,
					iteration = 0,
					blocks = self.getPendingGridblockIds();

				load = function() {
					var gridblockId = blocks[ iteration ],
						gridblock = ( gridblockId ) ? BGGB.configs.gridblocks[ gridblockId ] : false;

					if ( ! gridblock ) {
						clearInterval( interval );
						return;
					}

					if ( ! this.iframeCreated ) {
						self.createIframe( gridblock );
					}

					iteration++;
				};

				interval = window.setInterval( load, 100 );
			},

			/**
			 * Given a Gridblock config, Render the coresponding iframe.
			 *
			 * @since 1.4
			 */
			createIframe: function( gridblock ) {
				var load, postCssLoad, $contents,
					$gridblock = BGGB.View.$gridblockSection.find( '[data-id="' + gridblock.gridblockId + '"]' ),
					$iframe = $( '<iframe></iframe>' ),
					html = $gridblock.find( '.gridblock-html' ).html();

				$gridblock.prepend( $iframe );
				$gridblock.find( '.gridblock-html' ).empty();

				load = function() {
					$contents = $iframe.contents();

					$contents.find( 'body' ).html( html );
					BGGB.View.addBodyClasses( $contents );
					BGGB.View.addStyles( $contents );
					gridblock.iframeCreated = true;
					$gridblock.removeClass( 'gridblock-loading' );
					setTimeout( function() {
						BGGB.View.centerSection( $contents );
						self.removeLoadingOverlay();
					}, 500 );
				};

				postCssLoad = function() {
					if ( false === BGGB.View.headMarkup ) {
						self.$window.on( 'boldgrid_head_styles', load );
					} else {
						load();
					}
				};

				postCssLoad();
				$iframe.on( 'load', postCssLoad );
			}
		};

	BGGB.Loader = self;

})( jQuery );