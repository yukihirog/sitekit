import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import config from '../config';

const src = config.src + '/**/[^_]*.{shtml,shtm,html,htm}';

export function build_html() {
  return gulp.src(src)
    .pipe(plumber(config.plumberHandler))
    .pipe(cached('html'))
    .pipe(gulp.dest(config.dest))
  ;
}

export function watch_html() {
  return gulp.watch(src, build_html);
}
