import browserSync from 'browser-sync';
import config from '../config';

export function preview(done) {
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
