import config from '../config/index.js';
import path from 'path';
import { default as gulp } from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import through2 from 'through2';
import SSI from 'node-ssi';
import deepmerge from 'deepmerge/index.js';

const taskName = 'html';
const src = path.resolve(config.src, '**/*.{html,htm,shtml,shtm}');
const isProduction = config.mode === 'production';
const cwd = path.resolve(process.cwd());
const baseDir = path.resolve(cwd, config.src);

const vars = config.vars || {};

const ssi = new SSI({
  baseDir: baseDir,
  encoding: 'utf-8',
  payload: vars.global
});

const templateVarRegex = /\${([^}]*)}/imgs;

function getVar(vars, varName) {
  const propChain = varName.split(/\./g);
  let context = vars;
  for (let i = 0, n = propChain.length; i < n && context; i++) {
    const prop = propChain[i];
    if (context.hasOwnProperty(prop)) {
      context = context[prop];
    } else {
      context = '';
    }
  }
  return context || '';
};

function parseVar(vars, contents) {
  return contents.replace(templateVarRegex, (matched, varName, contents) => {
    return getVar(vars, varName);
  });
};

gulp.task(taskName, () => {
  return gulp
    .src(src)
    .pipe(plumber())
    .pipe(cached(taskName))
    // SSIを直に埋め込んでファイル出力する
    .pipe(through2.obj((file, encoding, callback) => {
      return ssi.compileFile(file.path, { encoding: encoding }, (err, content) => {
        if (err) {
          console.error(`Error: 'html:ssi' ${file.path}`);
          console.error(err);
        }
        file.contents = Buffer.from(content);
        return callback(null, file);
      });
    }))
    // ${変数}を使えるようにする
    .pipe(through2.obj((file, encoding, callback) => {
      const urlPathname = ('/' + path.relative(baseDir, file.path)).replace(/\/index\.html$/i, '/');
      const _vars = deepmerge({}, vars.global, vars[urlPathname]);

      if (_vars.root && _vars.host) {
        const url = new URL(urlPathname.replace(/^\//, ''), new URL(_vars.root, _vars.host));
        _vars.url = url;
        _vars.path = urlPathname.replace(/^\//, '');
      }

      const contents = parseVar(_vars, file.contents.toString());
      file.contents = Buffer.from(contents);
      return callback(null, file);
    }))
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