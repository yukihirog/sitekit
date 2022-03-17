import gulp from 'gulp';
import plumber from 'gulp-plumber';
import config from '../config';

const src = config.src + '/**/*';
const fixedsrc = config.fixedsrc + '/**/*';

export function deploy_src() {
  return gulp.src(src)
    .pipe(plumber(config.plumberHandler))
    .pipe(gulp.dest(config.dest))
  ;
}

export function deploy_fixedsrc() {
  return gulp.src(fixedsrc, { dot: true })
    .pipe(plumber(config.plumberHandler))
    .pipe(gulp.dest(config.dest))
  ;
}
