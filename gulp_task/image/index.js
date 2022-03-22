import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import imagemin from 'gulp-imagemin';
import config from '../config';

const src = config.path.src + '/**/[^_]*.{jpeg,jpg,png,gif,svg}';

function _process(outputDir, option) {
  return gulp.src(src, option)
    .pipe(plumber(config.plumberHandler))
    .pipe(cached('image'))
    .pipe(imagemin())
    .pipe(gulp.dest(outputDir))
  ;
};

export function build_image() {
  return _process(config.path.preview, { ignore: config.ignore.build });
}

export function release_image() {
  return _process(config.path.release, { ignore: config.ignore.release });
}

export function watch_image() {
  return gulp.watch(src, { ignore: config.ignore.watch }, build_image);
}
