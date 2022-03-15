import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import config from '../config';

const src = config.src + '/**/[^_]*.css';

export function build_css() {
  return gulp.src(src, { ignore: config.vendor, usesourcemaps: true })
    .pipe(plumber(config.plumberHandler))
    .pipe(cached('css'))
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(gulp.dest(config.dest, { usesourcemaps: '.' }))
  ;
}

export function watch_css() {
  return gulp.watch(src, { ignored: config.vendor }, build_css);
}
