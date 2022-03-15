import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import config from '../config';

const src = config.src + '/**/*.!(shtml|shtm|html|htm|sass|scss|css|js|jpeg|jpg|png|gif|svg)';

export function build_other() {
  return gulp.src(src, { ignore: config.vendor })
    .pipe(plumber(config.plumberHandler))
    .pipe(cached('other'))
    .pipe(gulp.dest(config.dest))
  ;
}

export function watch_other() {
  return gulp.watch(src, { ignored: config.vendor }, build_other);
}
