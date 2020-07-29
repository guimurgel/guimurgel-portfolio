/*
|--------------------------------------------------------------------------
| Gulpfile
|--------------------------------------------------------------------------
*/
const gulp = require("gulp");

//Plugins
const browserSync = require('browser-sync').create();
//const usemin = require('gulp-usemin');
const path = require('path');

//Helpers
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');

//Html
const fileinclude = require('gulp-file-include');
const htmlReplace = require('gulp-html-replace');
const header = require('gulp-header');

//Html - usemin
//const htmlmin = require('gulp-htmlmin');

//Css/Sass
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssComb = require('gulp-csscomb');
const cssmin = require('gulp-cssmin');

//Js
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const eslint = require('gulp-eslint');
//const jshintStylish = require('jshint-stylish');

//Js - usemin
//const minify = require('gulp-minifier');

//Images
const newer = require("gulp-newer");
const imagemin = require('gulp-imagemin');

//Del
const del = require('del');
const cache = require('gulp-cache');

//Server
//const msbuild = require("gulp-msbuild");
//const iisexpress = require('gulp-serve-iis-express');

/*
|--------------------------------------------------------------------------
| Paths
|--------------------------------------------------------------------------
*/
var paths = {
	html : {
		src : [
			'./html/*.html',
		],
		files : [
			'./html/**/*.html',
		],
		dest : {
			dev : [
				'./'
			],
			prod : [
				'./dist'
			]
		} 
	},
	sass : {
		src : [
			'./assets/sass/**/*.scss',
			'./assets/sass/styles.scss'
		],
		dest : [
			'./assets/css'
		]
	},
	js : {
		src : [
			'./assets/js/vendor/**/*.js',
			'./assets/js/core/**/*.js',
			'./assets/js/model/**/*.js',
			'./assets/js/components/**/*.js',
			'./assets/js/controller/**/*.js'
		],
		files : [
			//Vendor
			'./assets/js/vendor/jquery-3.4.0.min.js',

			'./assets/js/vendor/slick.js',
			'./assets/js/vendor/jquery.mask.js',
			'./assets/js/vendor/waypoint.js',
			'./assets/js/vendor/mixitup.js',
			'./assets/js/vendor/mixitup.pagination.js',
			'./assets/js/vendor/formatCases.js',
			//System
			'./assets/js/core/_nameSpace.js',
			'./assets/js/core/_core.js',
			'./assets/js/model/**/*.js',
			'./assets/js/components/**/*.js',
			'./assets/js/controller/**/*.js'
		],
		filesBuild : [
			//Vendor
			'./assets/js/vendor/jquery.mask.js',
			'./assets/js/vendor/waypoint.js',
			//System
			'./assets/js/core/_nameSpace.js',
			'./assets/js/core/_core.js',
			'./assets/js/model/**/*.js',
			'./assets/js/components/**/*.js',
			'./assets/js/controller/**/*.js' 
		],
		min : [
			'./assets/js/vendor/jquery-3.4.0.min.js',
			'./assets/js/vendor/slick.js',
			'./assets/js/vendor/mixitup.js',
			'./assets/js/vendor/mixitup.pagination.js',
			'./dist/assets/js/scripts.js',
		],
		dest : {
			dev : [
				'./assets/js'
			],
			prod : [
				'./dist/assets/js'
			]
		}
			

	},
	del : [
		'./dist'
	],
	css : {
		src : [
			'./assets/css/*.css'
		],
		lint : [
			'./assets/css/**/*.css'
		],
		dest : {
			dev : [

			],
			prod : [
				'./dist/assets/css'
			]
		}
	},
	fonts : {
		src : [
			'./assets/fonts/**/*'
		],
		dest : {
			dev : [

			],
			prod : [
				'./dist/assets/fonts'
			]
		}
	},
	images : {
		src : [
			'./assets/img/**/*.+(png|jpg|gif|svg)'
		],
		dest : {
			dev : [

			],
			prod : [
				'./dist/assets/img'
			]
		}
	},
	view : [
		'./html/**/*.html',
	],
	server : {
		src : [
			'../AppPadrao.sln'
		],
		sources : [
			'Controllers/*.cs',
			'Helpers/*.cs',
			'ViewModel/**/*.cs'
		],
		views : [
			'Views/**/*.cshtml',
		],
		port : [
			'52425'
		]
	}

}

/*
|--------------------------------------------------------------------------
| Tarefas Gerais
|--------------------------------------------------------------------------
*/
function browserSyncInit () {

	browserSync.init({
		server: {
			baseDir: './'
			//proxy: "localhost:3000"
		}
	});

}

function watch () {

	//HTML
	gulp.watch(paths.html.files, gulp.series('htmlInclude'));
	gulp.watch('*.html').on('change', function(event) {
		console.log('Compilando HTML - ' + event.path);
	});
	
	//SASS
	gulp.watch(paths.sass.src, gulp.series('styles'));
	gulp.watch(paths.sass.src).on('change', function(event) {
		console.log('Compilando SASS - ' + event.path);
	});

	//JS
	gulp.watch(paths.js.src, gulp.series('scripts'));
	gulp.watch(paths.js.src).on('change', function(event) {
		console.log('Compilando JS - ' + event.path);
	});
	
}

/*
|--------------------------------------------------------------------------
| Tarefas para Desenvolvimento
|--------------------------------------------------------------------------
*/
// Html
function htmlInclude () {
	return gulp
		.src(paths.html.src)
		.pipe(fileinclude({
			prefix: '@@',
			basepath: './html'
		}))
		.pipe(gulp.dest(paths.html.dest.dev))
		.pipe(notify('HTML Compilado'))
		.pipe(browserSync.stream());
}

// Sass
function styles () {
	return gulp
		.src(paths.sass.src)
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssComb())
		.pipe(gulp.dest(paths.sass.dest))
		.pipe(notify('SASS Compilado'))
		.pipe(browserSync.stream());

}

// Javascript
function scripts () {
	return gulp
	.src(paths.js.files)
	.pipe(plumber())
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest(paths.js.dest.dev))
	.pipe(notify('JavaScript Compilado'))
	.pipe(browserSync.stream());
}
function scriptsLint () {
	return gulp
    .src(paths.js.src)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

/*
|--------------------------------------------------------------------------
| Tarefas de Build
|--------------------------------------------------------------------------
*/

// Clean dist folder
function cleanDist () {
	return del(paths.del);
};

// Clear Cache
function cleanCache () {
	return cache.clearAll();
};

// Css
function css () {
	return gulp
		.src(paths.css.src)
		.pipe(plumber())
		.pipe(concat('styles.css'))
		.pipe(cssmin())
		.pipe(gulp.dest(paths.css.dest.prod));
};

// Javascript
function concatScriptsFull () {
	return gulp
		.src(paths.js.filesBuild)
		.pipe(plumber())
		.pipe(concat('scripts.js'))
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.dest.prod));
}
function concatScriptsOthers () {
	return gulp
	.src(paths.js.min,{ allowEmpty: true })
	.pipe(plumber())
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest(paths.js.dest.prod));
}

// Html
function html () {
	return gulp
		.src('./*.html')
		.pipe(header('\ufeff'))
		.pipe(htmlReplace({
			js: 'js/scripts.js',
			css: 'css/styles.css'
		}))
		.pipe(gulp.dest(paths.html.dest.prod));
};

// Fonts
function fonts () {
	return gulp
		.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest.prod))
};

// Images
function images () {
	return gulp
		.src(paths.images.src)
		//.pipe(newer(paths.images.dest.prod))
    .pipe(imagemin())
		.pipe(gulp.dest(paths.images.dest.prod))
};

// Usemin - Concatena, Minifica, Replace HTML e coloca os prefixers dos arquivos JS e CSS
function usemin () {
	return gulp
		.src(paths.html.src)
		.pipe(plumber())
		.pipe(header('\ufeff'))
		.pipe(usemin({
			'html' : [fileinclude],
			//'html' : [ htmlmin({ collapseWhitespace: true }) ],
			'js' : [minify({
						minify: true,
						minifyJS : true,
					})],
			'css' : [autoprefixer, cssmin]
		}))
		.pipe(gulp.dest(paths.html.dest.prod));
};

/*
|--------------------------------------------------------------------------
| Tarefas Server CS
|--------------------------------------------------------------------------
*/
function browserSyncInitCS () {
		browserSync.init({
			baseDir: 'content',
			proxy: 'http://localhost:' + paths.server.port,
			notify: false,
			ui: false
	});
};

function watchCS () {
	gulp.watch(paths.server.sources, gulp.series('buildVS'));
	return gulp.watch(paths.server.views,  gulp.series('reload'));
};

function server () {
	var configPath = path.join(__dirname, '..\\.vs\\config\\applicationhost.config');
	iisexpress({
			siteNames: ['AppPadrao.Web'],
			configFile: configPath,
			port: paths.server.port
	});
};

function buildVS () {
	return gulp
		.src(paths.server.src)
		.pipe(plumber())
		.pipe(msbuild({
				toolsVersion: 'auto',
				logCommand: true
		}));
};

function reload () {
	browserSync.reload();
};

/*
|--------------------------------------------------------------------------
| Export Tasks
|--------------------------------------------------------------------------
*/

//Define complex tasks
const clean = gulp.series(cleanDist, cleanCache);
const js = gulp.series(concatScriptsFull,concatScriptsOthers);
const build = gulp.series(clean,gulp.parallel(css,js,html,fonts,images));
const buildusemin = gulp.series(clean,gulp.parallel(usemin,html,fonts,images));
const startcs = gulp.series(server,buildVS,gulp.parallel(browserSyncInitCS,watchCS));

//Export tasks
//Dev
exports.browserSyncInit = browserSyncInit;
exports.watch = watch;
exports.htmlInclude = htmlInclude;
exports.styles = styles;
exports.scripts = scripts;
exports.scriptsLint = scriptsLint;
exports.js = js;

//Prod
exports.build = build;
exports.buildusemin = buildusemin;
exports.clean = clean;

//Server
exports.startcs = startcs;

/*
|--------------------------------------------------------------------------
| Init
|--------------------------------------------------------------------------
*/
gulp.task('default',  gulp.parallel(browserSyncInit, watch));