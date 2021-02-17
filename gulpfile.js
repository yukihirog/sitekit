'use strict';

const gulp         = require('gulp'),
    plumber        = require('gulp-plumber'),
    sourcemaps     = require('gulp-sourcemaps'),
    concat         = require('gulp-concat'),
    sass           = require('gulp-sass'),
    sassGlob       = require('gulp-sass-glob'),
    uglify         = require('gulp-uglify'),
    imagemin       = require('gulp-imagemin'),
    changed        = require('gulp-changed'),
    browserSync    = require('browser-sync').create(),
    pathConfig     = require('./config/path.js'),
    path_base      = pathConfig.path_base,
    path           = pathConfig.path,
    bsConfigBase   = require('./config/browsersync.base'),
    bsConfigUser   = require('./config/browsersync.user')
;


gulp.task('uglifyCommon', function (done) {
  gulp
    .src(path.dev.commonJS)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('common.js'))
    .pipe(
      uglify(
        {
          output: {
            comments: "@license"
          }
        }
      )
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.commonJS))
  ;
  done();
});

gulp.task('uglifyCommon:watch', function (done) {
  gulp.watch(path.dev.commonJS, gulp.series('uglifyCommon'));
  done();
});

gulp.task('uglify', function (done) {
  gulp
    .src(path.dev.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      uglify(
        {
          output: {
            comments: "@license"
          }
        }
      )
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.js))
  ;
  done();
});

gulp.task('uglify:watch', function (done) {
  gulp.watch(path.dev.js, gulp.series('uglify'));
  done();
});



gulp.task('sass', function (done) {
  gulp.src(path.dev.css)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({noCache: true, outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.css))
  ;
  done();
});

gulp.task('sass:watch', function (done) {
  gulp.watch(path.dev.css, gulp.series('sass'));
  done();
});



gulp.task('imagemin', function (done) {
  gulp
    .src(path.dev.img)
    .pipe(plumber())
    .pipe(changed(path.dist.img))
    .pipe(
      imagemin()
    )
    .pipe(gulp.dest(path.dist.img))
  ;
  done();
});

gulp.task('imagemin:watch', function (done) {
  gulp.watch(path.dev.img, gulp.series('imagemin'));
  done();
});



gulp.task('browser-sync', function (done) {
  browserSync.init(
    Object.assign(
      bsConfigBase,
      bsConfigUser
    )
  );
  done();
});

gulp.task('browser-sync-reload', function (done) {
  browserSync.reload();
  done();
});

gulp.task('browser-sync:watch', function (done) {
  gulp.watch(
    [
      path_base.dist + '**/*'
    ],
    gulp.series('browser-sync-reload')
  );
  done();
});



gulp.task(
  'process',
  gulp.series(
    'uglifyCommon',
    'uglify',
    'sass',
    'imagemin',
    'browser-sync'
  )
);

gulp.task(
  'watch',
  gulp.series(
    'uglifyCommon:watch',
    'uglify:watch',
    'sass:watch',
    'imagemin:watch',
    'browser-sync:watch'
  )
);

gulp.task(
  'default',
  gulp.series(
    'process',
    'watch'
  )
);
