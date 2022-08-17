import config from '../config/index.js';
import path from 'path';
import { default as gulp } from 'gulp';
import browserSync from 'browser-sync';
import { default as gulpConnectPHP } from 'gulp-connect-php';

const taskName = 'preview';
const cwd = process.cwd();

const previewer = browserSync.create();
const dest = path.resolve(cwd, config.dest);

gulp.task(taskName, (done) => {
  previewer.init({
    watch: true,
    open: true,
    notify: false,
    ghostMode: false,
    startPath: config.vars?.global?.startPath,
    server: {
      baseDir: config.server?.baseDir || '/',
      index: config.server?.index || 'index.html'
    }
  });

  done();
});

gulp.task(taskName + ':php', (done) => {
  const port = config.server?.phpPort || 8000;
  gulpConnectPHP.server(
    {
      port: port,
      base: config.server?.baseDir
    },
    () => {
      previewer.init({
        proxy: 'localhost:' + port,
        open: true,
        notify: false,
        ghostMode: false,
        startPath: config.vars?.global?.startPath,
      });
    }
  );

  gulp.watch(dest + '**/*').on('change', () => {
    previewer.reload();
  });

  done();
});

export default gulp.series(taskName)