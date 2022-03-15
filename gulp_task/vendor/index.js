import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import config from '../config';

const src = config.src + '/**/vendor/**/*';

export function build_vendor() {
  return gulp.src(src)
    .pipe(plumber(config.plumberHandler))
    .pipe(cached('vendor'))
    .pipe(gulp.dest(config.dest))
  ;
}

export function watch_vendor() {
  return gulp.watch(src, build_vendor);
}
