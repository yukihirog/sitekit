import gulp from 'gulp';
import plumber from 'gulp-plumber';
import config from '../config';

const src = config.path.src + '/**/*';
const fixed = config.path.fixed + '/**/*';

export function deploy_fixed() {
  return gulp.src(fixed, { dot: true, ignore: config.ignore.deploy })
    .pipe(plumber(config.plumberHandler))
    .pipe(gulp.dest(config.path.preview))
  ;
}
