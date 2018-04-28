let gulp           = require('gulp'),
    plumber        = require('gulp-plumber'),
    sourcemaps     = require('gulp-sourcemaps'),
    sass           = require('gulp-sass'),
    uglifyjs       = require('gulp-uglifyjs'),
    imagemin       = require('gulp-imagemin'),
    changed        = require('gulp-changed'),
    browserSync    = require('browser-sync').create(),
    pathConfig     = require('./config/path.js'),
    path_base      = pathConfig.path_base,
    path           = pathConfig.path,
    bsConfigBase   = require('./config/browsersync.base'),
    bsConfigUser   = require('./config/browsersync.user')
;


gulp.task('uglify', function() {
  gulp
    .src(path.dev.js)
    .pipe(plumber())
    .pipe(
      uglifyjs(
        'common.js',
        {
          outSourceMap: true,
          output: {
            comments: "@license"
          }
        }
      )
    )
    .pipe(gulp.dest(path.dist.js))
  ;
});

gulp.task('uglify:watch', function () {
  gulp.watch(path.dev.js, ['uglify']);
});



gulp.task('sass', function() {
  gulp.src(path.dev.css)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({noCache: true, outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.css))
  ;
});

gulp.task('sass:watch', function () {
  gulp.watch(path.dev.css, ['sass']);
});



gulp.task('imagemin', function() {
  gulp
    .src(path.dev.img)
    .pipe(plumber())
    .pipe(changed(path.dist.img))
    .pipe(
      imagemin()
    )
    .pipe(gulp.dest(path.dist.img))
  ;
});

gulp.task('imagemin:watch', function () {
  gulp.watch(path.dev.img, ['imagemin']);
});



gulp.task('browser-sync', function () {
  browserSync.init(
    Object.assign(
      bsConfigBase,
      bsConfigUser
    )
  );
});

gulp.task('browser-sync-reload', function () {
  browserSync.reload();
});

gulp.task('browser-sync:watch', function () {
  gulp.watch(
    [
      path.dev.dummy + '**/*',
      path_base.dist + '**/*'
    ],
    ['browser-sync-reload']
  );
});



gulp.task(
  'process',
  [
    'uglify',
    'sass',
    'imagemin',
    'browser-sync'
  ]
);

gulp.task(
  'watch',
  [
    'uglify:watch',
    'sass:watch',
    'imagemin:watch',
    'browser-sync:watch'
  ]
);

gulp.task(
  'default',
  [
    'process',
    'watch'
  ]
);
