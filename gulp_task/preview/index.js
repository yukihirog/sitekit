import browserSync from 'browser-sync';
import config from '../config';

export function preview_plain(done) {
  const previewer = browserSync.create();

  previewer.init({
    watch: true,
    server: {
      baseDir: config.dest,
      index: 'index.html'
    },
    notify: false,
    ghostMode: false
  });

  done();
}

export function preview_docker(done) {
  const previewer = browserSync.create();

  previewer.init({
    proxy: 'localhost',
    watch: true,
    files: '**/*',
    notify: false,
    ghostMode: false
  });

  done();
}
