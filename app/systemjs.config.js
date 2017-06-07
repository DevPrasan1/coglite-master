/**
 * System JS Configuration
 */
(function (global) {
	//paths as alias
	var paths = {
		'npm:': '../npm-libs/'
	};

	var map = {
		//App & rxjs map
		'app': 'compiledSrc/',
		'rxjs': 'npm:rxjs',
		'hammerjs': 'npm:hammerjs',

		//angular bundles
		'@angular/core': 'npm:@angular/core/bundles/core.umd.js',
		'@angular/common': 'npm:@angular/common/bundles/common.umd.js',
		'@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
		'@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
		'@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
		'@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
		'@angular/animations': 'npm:@angular/animations/bundles/animations.umd.min.js',
		'@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
		'@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
		'@angular/router': 'npm:@angular/router/bundles/router.umd.js',
		'@angular/material': 'npm:@angular/material/bundles/material.umd.js',
		'@angular/http': 'npm:@angular/http/bundles/http.umd.js',
		'angular2-toaster': 'npm:angular2-toaster/bundles/angular2-toaster.umd.js',
		'angular-2-dropdown-multiselect': 'npm:angular-2-dropdown-multiselect',
		'ng2-clipboard': 'npm:ng2-clipboard/bundles/ng2-clipboard.umd.js',
		'md2': 'npm:md2/bundles/md2.umd.js',
		'@ngx-translate/core': 'npm:@ngx-translate/core/bundles/core.umd.js',
		'@ngx-translate/http-loader': 'npm:@ngx-translate/http-loader/bundles/http-loader.umd.js',
		'moment': 'npm:moment',
		'moment-timezone': 'npm:moment-timezone',
		'angular2-moment': 'npm:angular2-moment',
		'lodash': 'npm:lodash',
		'ng2-bootstrap': 'npm:ng2-bootstrap',
		'jquery': 'npm:jquery/dist/jquery.min.js',
		'@mohuk/ng2-uploader': 'npm:@mohuk/ng2-uploader',
		'text-mask-core': 'npm:text-mask-core',
		'ngx-uploader': 'npm:ngx-uploader/bundle/ngx-uploader.umd.js',
		'ng2-file-upload': 'npm:ng2-file-upload'
	};

	var packages = {
		'app': { defaultExtension: 'js', main: 'main.js' },
		'rxjs': { defaultExtension: 'js' },
		'hammerjs': { defaultExtension: 'js', main: 'hammer.js' },
		'angular-2-dropdown-multiselect': { defaultExtension: 'js' },
		'text-mask-core': {
			defaultExtension: 'js'
		},
		'moment': {
			main: './moment.js',
			defaultExtension: 'js'
		},
		'angular2-moment': {
			main: './index.js',
			defaultExtension: 'js'
		},
		'lodash': {
			main: 'lodash.js',
			defaultExtension: 'js'
		},
		'ng2-bootstrap': {
			main: 'bundles/ngx-bootstrap.umd.js',
			defaultExtension: 'js'
		},
		'@mohuk/ng2-uploader': {
			main: './lib/index.js',
			defaultExtension: 'js'
		},
		'ng2-file-upload': {
			main: 'bundles/ng2-file-upload.umd.js',
			defaultExtension: 'js'
		},
		 'moment-timezone': {
			main: './builds/moment-timezone-with-data-2012-2022.min.js',
			defaultExtension: 'js'
		}
	};

	//
	System.config({
		paths: paths,
		map: map,
		packages: packages,
		meta: {
			'moment': { format: 'global' },
			'moment-timezone': { format: 'global' }
		}
	});
	System.import('npm:moment/moment.js');
	System.import('npm:moment-timezone/moment-timezone.js');
})(this);