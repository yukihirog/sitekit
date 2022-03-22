import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import config from '../config';

const src = config.path.src + '/**/*.{sass,scss}';

function _process(outputDir, option) {
  const sass = gulpSass(dartSass);
  return gulp.src(src, option)
    .pipe(plumber(config.plumberHandler))
    .pipe(cached('sass'))
    .pipe(sass.sync({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(outputDir, { usesourcemaps: '.' }))
  ;
};

export function build_sass() {
  return _process(config.path.preview, { usesourcemaps: true, ignore: config.ignore.build });
}

export function release_sass() {
  return _process(config.path.release, { usesourcemaps: true, ignore: config.ignore.release });
}

export function watch_sass() {
  return gulp.watch(src, { ignore: config.ignore.watch }, build_sass);
}
