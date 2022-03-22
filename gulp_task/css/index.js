import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import config from '../config';

const src = config.path.src + '/**/[^_]*.css';

function _process(outputDir, option) {
  return gulp.src(src, option)
    .pipe(plumber(config.plumberHandler))
    .pipe(cached('css'))
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(gulp.dest(outputDir, { usesourcemaps: '.' }))
  ;
};

export function build_css() {
  return _process(config.path.preview, { usesourcemaps: true, ignore: config.ignore.build });
}

export function release_css() {
  return _process(config.path.release, { usesourcemaps: true, ignore: config.ignore.release });
}

export function watch_css() {
  return gulp.watch(src, { ignore: config.ignore.watch }, build_css);
}
