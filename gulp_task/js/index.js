import gulp from 'gulp';
import plumber from 'gulp-plumber';
// import cached from 'gulp-cached';
import babelify from 'babelify';
import browserify from 'browserify';
import through2 from 'through2';
import PluginError from 'plugin-error';
import uglify from 'gulp-uglify';
import config from '../config';

const src = config.path.src + '/**/[^_]*.js';

function _process(outputDir, option) {
  return gulp
    .src(src, option)
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
    .pipe(gulp.dest(outputDir, { usesourcemaps: '.' }))
  ;
};

export function build_js() {
  return _process(config.path.preview, { usesourcemaps: true, ignore: config.ignore.build });
}

export function release_js() {
  return _process(config.path.release, { usesourcemaps: true, ignore: config.ignore.release });
}

export function watch_js() {
  return gulp.watch(src, { ignore: config.ignore.watch }, build_js);
}
