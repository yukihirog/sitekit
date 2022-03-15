import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import imagemin from 'gulp-imagemin';
import config from '../config';

const src = config.src + '/**/*.{jpeg,jpg,png,gif,svg}';

export function build_image() {
  return gulp.src(src, { ignore: config.vendor })
    .pipe(plumber(config.plumberHandler))
    .pipe(cached('image'))
    .pipe(imagemin())
    .pipe(gulp.dest(config.dest))
  ;
}

export function watch_image() {
  return gulp.watch(src, { ignored: config.vendor }, build_image);
}
