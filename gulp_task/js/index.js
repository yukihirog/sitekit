import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import uglify from 'gulp-uglify';
import config from '../config';

const src = config.src + '/**/*.js';

export function build_js() {
  return gulp
    .src(src, { ignore: config.vendor, usesourcemaps: true })
    .pipe(plumber(config.plumberHandler))
    .pipe(cached('js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dest, { usesourcemaps: '.' }))
  ;
}

export function watch_js() {
  return gulp.watch(src, { ignored: config.vendor }, build_js);
}
