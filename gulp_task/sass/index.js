import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import config from '../config';

const src = config.src + '/**/*.{sass,scss}';

export function build_sass() {
  const sass = gulpSass(dartSass);
  return gulp.src(src, { usesourcemaps: true })
    .pipe(plumber(config.plumberHandler))
    .pipe(cached('sass'))
    .pipe(sass.sync({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(config.dest, { usesourcemaps: '.' }))
  ;
}

export function watch_sass() {
  return gulp.watch(src, build_sass);
}
