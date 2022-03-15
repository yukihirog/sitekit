import gulp from 'gulp';
import plumber from 'gulp-plumber';
// import cached from 'gulp-cached';
import babelify from 'babelify';
import browserify from 'browserify';
import through2 from 'through2';
import PluginError from 'plugin-error';
import uglify from 'gulp-uglify';
import config from '../config';

const src = config.src + '/**/*.js';

export function build_js() {
  return gulp
    .src(src, { ignore: config.vendor, usesourcemaps: true })
    .pipe(plumber(config.plumberHandler))
/* cachedが効いているとモジュール更新時にbrowserifyで親JSが更新されないので、対策できるまではコメントアウト
    .pipe(cached('js'))
*/
    .pipe(
      through2.obj((file, enc, callback) => {
        browserify(file.path, { ignore: config.vendor })
          .transform(babelify, { presets: ['@babel/preset-env'] })
          .bundle(
            (err, buf) => {
              if (err !== null) {
                return callback(
                  new PluginError('browserify', err, { showProperties: true })
                );
              }

              file.contents = buf;

              callback(err, file);
            }
          )
        ;
      })
    )
    .pipe(uglify({
      output: { comments: 'some' }
    }))
    .pipe(gulp.dest(config.dest, { usesourcemaps: '.' }))
  ;
}

export function watch_js() {
  return gulp.watch(src, { ignored: config.vendor }, build_js);
}
