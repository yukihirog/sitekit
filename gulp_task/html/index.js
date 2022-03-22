import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import config from '../config';

const src = config.path.src + '/**/[^_]*.{shtml,shtm,html,htm}';

function _process(outputDir, option) {
  return gulp.src(src, option)
    .pipe(plumber(config.plumberHandler))
    .pipe(cached('html'))
    .pipe(gulp.dest(outputDir))
  ;
};

export function build_html() {
  return _process(config.path.preview, { ignore: config.ignore.build });
}

export function release_html() {
  return _process(config.path.release, { ignore: config.ignore.release });
}

export function watch_html() {
  return gulp.watch(src, { ignore: config.ignore.watch }, build_html);
}
