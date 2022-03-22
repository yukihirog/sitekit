import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import config from '../config';

const src = config.path.src + '/**/[^_]*.!(shtml|shtm|html|htm|sass|scss|css|js|jpeg|jpg|png|gif|svg)';

function _process(outputDir, option) {
  return gulp.src(src, option)
    .pipe(plumber(config.plumberHandler))
    .pipe(cached('other'))
    .pipe(gulp.dest(outputDir))
  ;
};

export function build_other() {
  return _process(config.path.preview, { dot: true, ignore: config.ignore.build });
}

export function release_other() {
  return _process(config.path.release, { dot: true, ignore: config.ignore.release });
}

export function watch_other() {
  return gulp.watch(src, { ignore: config.ignore.watch }, build_other);
}
