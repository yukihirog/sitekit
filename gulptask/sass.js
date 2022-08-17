import config from '../config/index.js';
import path from 'path';
import { default as gulp } from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoPrefixer from 'gulp-autoprefixer';

const taskName = 'sass';
const src = path.resolve(config.src, '**/*.{sass,scss}');
const isProduction = config.mode === 'production';
const useSourceMaps = isProduction ? false : true;

const sass = gulpSass(dartSass);

gulp.task(taskName, () => {
  return gulp
    .src(
      src,
      {
        sourcemaps: useSourceMaps,
      }
    )
    .pipe(plumber({
      errorHandler: function(err){
        console.error('\u001b[31m' + err.message + '\u001b[0m');
        this.emit('end');
      }
    }))
    .pipe(cached(taskName))
    .pipe(sass({
      outputStyle: isProduction ? 'compressed' : 'expanded',
      includePaths: config.src,
    }))
    .pipe(autoPrefixer({
      grid: true,
      cascade: true,
    }))
    .pipe(gulp.dest(config.dest, {
      sourcemaps: useSourceMaps ? '.' : null,
    }))
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