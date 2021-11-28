'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
var autoprefixer = require('gulp-autoprefixer');
var bs = require('browser-sync').create();
var rimraf = require('rimraf');

var path = {
	src: {
		html: 'source/*.html',
		others: 'source/*.+(php|ico|png)',
		htminc: 'source/partials/**/*.htm',
		incdir: 'source/partials/',
		plugins: 'source/plugins/**/*.*',
		js: 'source/js/*.+(js|json)',
		scss: 'source/scss/**/*.scss',
		images: 'source/images/**/*.+(png|jpg|gif|svg)',
		sound: 'source/sound/**/*.+(mp3)'
	},
	build: {
		dirDev: 'theme/'
	}
};

// HTML
function html() {
	return gulp.src(path.src.html)
		.pipe(fileinclude({
			basepath: path.src.incdir
		}))
		.pipe(gulp.dest(path.build.dirDev))
		.pipe(bs.reload({
			stream: true
		}));
};

// SCSS
function scss() {
	return gulp.src(path.src.scss)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest(path.build.dirDev + 'css/'))
		.pipe(bs.reload({
			stream: true
		}));
};

// Javascript
function js() {
	return gulp.src(path.src.js)
		.pipe(gulp.dest(path.build.dirDev + 'js/'))
		.pipe(bs.reload({
			stream: true
		}));
};

// Images
function images() {
	return gulp.src(path.src.images)
		.pipe(gulp.dest(path.build.dirDev + 'images/'))
		.pipe(bs.reload({
			stream: true
		}));
};

function sound() {
	return gulp.src(path.src.sound)
		.pipe(gulp.dest(path.build.dirDev + 'sound/'))
		.pipe(bs.reload({
			stream: true
		}));
};

// Plugins
function plugins() {
	return gulp.src(path.src.plugins)
		.pipe(gulp.dest(path.build.dirDev + 'plugins/'))
		.pipe(bs.reload({
			stream: true
		}));
};

// Other files like favicon, php, sourcele-icon on root directory
function others() {
	return gulp.src(path.src.others)
		.pipe(gulp.dest(path.build.dirDev))
};

// Clean Build Folder
function clean(cb) {
	rimraf('./theme', cb);
};

// Watch Task
function watch() {
	gulp.watch(path.src.html, html);
	gulp.watch(path.src.htminc, html);
	gulp.watch(path.src.scss, scss);
	gulp.watch(path.src.js, js);
	gulp.watch(path.src.images, images);
	gulp.watch(path.src.sound, sound);
	gulp.watch(path.src.plugins, plugins);
};

exports.default = gulp.series(clean, gulp.parallel(
	html,
	js,
	scss,
	images,
	sound,
	plugins,
	others,
	watch, function () {
		bs.init({
			server: {
				baseDir: path.build.dirDev
			}
		});
	})
);

exports.build = gulp.series(clean, gulp.parallel(
	html,
	js,
	scss,
	images,
	sound,
	plugins,
	others
	)
)
