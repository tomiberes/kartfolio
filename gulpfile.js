'use strict';

var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    stringify = require('stringify'),
    rename = require('gulp-rename'),
    hint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    watchify = require('gulp-watchify'),
    server = require('gulp-server-livereload');

var debug = process.env.NODE_ENV !== 'production';

var conf = {
  SRC: './src/',
  ASSETS: './assets/',
  DEST: './build/',
  browserify: {
    debug: debug
  },
  stringify: {
    extensions: ['.html'],
    minify: true,
    minifier: {
      extensions: ['.html']
    }
  }
};

gulp.task('hint', function() {
  return gulp.src(conf.SRC + 'scripts/**/*.js')
    .pipe(hint());
});

gulp.task('browserify', function() {
  return browserify(conf.SRC + 'scripts/index.js', conf.browserify)
    .transform(stringify(conf.stringify))
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(conf.DEST + 'js'));
});

gulp.task('uglified', ['browserify'], function() {
  return gulp.src(conf.DEST + 'js/app.js')
    .pipe(uglify({}))
    .pipe(gulp.dest(conf.DEST + 'js'));
});

gulp.task('less', function() {
  return gulp.src(conf.SRC +'styles/index.less')
    .pipe(less())
    .pipe(rename('style.css'))
    .pipe(gulp.dest(conf.DEST + 'css'));
});

gulp.task('copy', function() {
  return gulp.src(conf.SRC + 'index.html')
    .pipe(gulp.dest(conf.DEST));
});

gulp.task('assets', function() {
  return gulp.src(conf.ASSETS + '**/*.*')
    .pipe(gulp.dest(conf.DEST + 'assets'));
});

gulp.task('watchify', watchify(function(watchify) {
  return gulp.src([
      conf.SRC + 'scripts/**/*.js',
      conf.SRC + 'templates/**/*.html'
    ])
    .pipe(watchify({
      watch: true
    }))
    .pipe(gulp.dest(conf.DEST + 'js'));
}));

gulp.task('webserver', function() {
  return gulp.src('build')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      open: true
    }));
});

gulp.task('release', ['uglified', 'less', 'copy', 'assets'], function() {
  return;
});

gulp.task('watch', ['webserver'], function() {
  gulp.watch(conf.SRC + 'scripts/**/*.js', ['browserify']);
  gulp.watch(conf.SRC + 'templates/**/*.html', ['browserify']);
  gulp.watch(conf.SRC + 'styles/**/*.less', ['less']);
  gulp.watch(conf.SRC + 'index.html', ['copy']);
});

gulp.task('default', ['hint', 'browserify', 'less', 'copy', 'assets'], function() {});
