import config from '../config/index.js';
import path from 'path';
import { default as gulp } from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import imagemin from 'gulp-imagemin';

const taskName = 'image';
const src = path.resolve(config.src, '**/*.{jpg,jpeg,png,gif,svg}');

gulp.task(taskName, () => {
  return gulp
    .src(src)
    .pipe(plumber())
    .pipe(cached(taskName))
    .pipe(imagemin())
    .pipe(gulp.dest(config.dest))
  ;
});

gulp.task(taskName + ':watch', () => {
  delete cached.caches[taskName];
  return gulp.watch(src, gulp.series(
    (done) => {
      delete cached.caches[taskName];
      return done();
    },
    taskName
  ));
});

export default gulp.series(taskName)