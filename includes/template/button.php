<script type="text/html" id="tmpl-boldgrid-editor-button">
	<div class='choices button-design'>
		<div class='title'>
			<h4>Sample Designs</h4>
		</div>
		<div class='presets supports-customization'>
			<ul>
			<# _.each( data.presets, function ( preset ) { #>
				<li data-preset="{{preset.name}}" class="panel-selection">
					<a class='{{preset.name}}'>{{data.text}}</a>
				</li>
			<# }); #>
			</ul>
		</div>
		<div class='customize'>
			<div class='back'>
				<a class='panel-button' href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i> Preset Designs</a>
			</div>
		<div class='color-controls section button-color-controls'>
			<h4>Color</h4>
			<label for="button-color" class='color-preview'></label>
			<input type="text" data-type="" name='button-color' class='color-control' value=''>
		</div>
		<div class="section button-size-control">
			<h4>Size</h4>
			<div class="slider"></div>
			<span class='value'></span>
		</div>
		<div class='class-control button-shape section'>
			<p>Shape</p>
    		<label><input type="radio" checked="checked" name="button-shape" value="">Normal</label>
    		<label><input type="radio" name="button-shape" value="btn-rounded">Rounded</label>
    		<label><input type="radio" name="button-shape" value="btn-pill">Pill</label>
		</div>
		<div class='class-control button-raised section'>
			<p>Raised</p>
    		<label><input type="radio" checked="checked" name="button-raised" value="">Flat</label>
    		<label><input type="radio" name="button-raised" value="btn-raised">Raised</label>
		</div>
		<div class='class-control button-text-shadow section'>
			<p>Text Shadow</p>
    		<label><input type="radio" checked="checked" name="button-text-shadow" value="">None</label>
    		<label><input type="radio" name="button-text-shadow" value="btn-longshadow">Enabled</label>
		</div>
		<div class='class-control button-block section'>
			<p>Width</p>
    		<label><input type="radio" checked="checked" name="button-block" value="">Normal</label>
    		<label><input type="radio" name="button-block" value="btn-block">Full Width</label>
		</div>
		<div class='class-control button-effect section'>
			<p>Effect</p>
    		<label><input type="radio" checked="checked" name="button-effect" value="">None</label>
    		<label><input type="radio" name="button-effect" value="btn-3d">3D</label>
    		<label><input type="radio" name="button-effect" value="btn-glow">Glow</label>
		</div>
		<div class='class-control button-shape section'>
			<p>Text Style</p>
    		<label><input type="radio" checked="checked" name="button-text-style" value="">Unmodified</label>
    		<label><input type="radio" name="button-text-style" value="btn-uppercase">Uppercase</label>
    		<label><input type="radio" name="button-text-style" value="btn-small-caps">Small Uppercase</label>
		</div>
	</div>
</script>