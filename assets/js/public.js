var $ = window.jQuery;
import wow from 'wowjs';

class Public {

	/**
	 * Setup the class.
	 *
	 * @since 1.7.0
	 */
	init() {
		$( () => {
			this.setupParallax();

			let wowJs = new wow.WOW();
			wowJs.init();
		} );
	}

	/**
	 * Run Parallax settings.
	 *
	 * @since 1.7.0
	 */
	setupParallax() {
		let $parallaxBackgrounds = $( '.background-parallax' );

		if ( $parallaxBackgrounds.length ) {
			$parallaxBackgrounds
				.attr( 'data-stellar-background-ratio', '.3' )
				.css( 'background-position-x', 0 );

			$( 'body' ).stellar();
		}
	}
}

new Public().init();