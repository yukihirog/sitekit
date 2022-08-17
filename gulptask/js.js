import config from '../config/index.js';
import path from 'path';
import { default as gulp } from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import through2 from 'through2';
import { rollup } from 'rollup';
import rollupNodeResolve from '@rollup/plugin-node-resolve';
import rollupCommonJS from '@rollup/plugin-commonjs';
import rollupBabel from '@rollup/plugin-babel';
import uglify from 'gulp-uglify';

const taskName = 'js';
const src = path.resolve(config.src, '**/*.{js,mjs,cjs}');
const isProduction = config.mode === 'production';
const useSourceMaps = isProduction ? false : true;

const rollupPlugins = [
  rollupNodeResolve(),
  rollupCommonJS(),
  rollupBabel.babel({
    exclude: 'node_modules/**',
    presets: ['@babel/preset-env'],
    babelHelpers: 'bundled',
    sourceMaps: useSourceMaps,
  })
];
const cwd = process.cwd();
const root = path.resolve(cwd, config.src);

gulp.task(taskName, () => {
  return gulp
    .src(
      src,
      {
        ignore: ['**/_*', '**/_*/**/*'],
        sourcemaps: useSourceMaps,
      }
    )
    .pipe(plumber())
    .pipe(cached(taskName))
    // rollupの処理
    .pipe(through2.obj(async (file, encoding, callback) => {
      const inputFile = path.resolve(cwd, file.path);
      // rollupしないファイルの処理
      if (inputFile.match(/\/(vendor|lib)\//)) {
        callback(null, file);
        return;
      }

      const currentDir = path.dirname(inputFile);
      const jsPath = inputFile.replace(root, '');
      const destFile = path.resolve(cwd, config.dest) + jsPath;

      // 読み込み
      const bundle = await rollup({
        input: inputFile,
        plugins: rollupPlugins
      });

      // 結合処理
      const { output } = await bundle.generate({
        file: destFile,
        format: 'iife',
        sourcemap: useSourceMaps,
        name: path.basename(destFile),
        exports: 'named'
      });

      const lastOutput = output[0];

      file.contents = Buffer.from(lastOutput.code);

      // ソースマップの更新
      if (useSourceMaps) {
        lastOutput.map.file = file.sourceMap.file;
        lastOutput.map.sources = lastOutput.map.sources.map((filePath) => {
          return path.resolve(currentDir, path.resolve(currentDir, filePath));
        });
        file.sourceMap = lastOutput.map;
      }

      callback(null, file);
    }))
    .pipe(uglify())
    .pipe(gulp.dest(config.dest, {
      sourcemaps: useSourceMaps ? '.' : null,
    }))
  ;
});

gulp.task(taskName + ':watch', () => {
  delete cached.caches[taskName];
  return gulp.watch(path.resolve(config.src, '**/*.{js,mjs,cjs}'), gulp.series(
    (done) => {
      delete cached.caches[taskName];
      return done();
    },
    taskName
  ));
});

export default gulp.series(taskName)