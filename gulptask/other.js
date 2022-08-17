import config from '../config/index.js';
import path from 'path';
import { default as gulp } from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';

const taskName = 'other';
const src = path.resolve(config.src, '**/*.!(sass|scss|js|mjs|cjs|html|htm|shtml|shtm|jpeg|jpg|gif|png|svg)');

gulp.task(taskName, () => {
  return gulp
    .src(
      src,
      {
        dot: true,
        ignore: ['**/_*'],
      }
    )
    .pipe(plumber())
    .pipe(cached(taskName))
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