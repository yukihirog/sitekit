import browserSync from 'browser-sync';
import config from '../config';

export function preview_plain(done) {
  const previewer = browserSync.create();
  previewer.init(config.browserSync.plain);
  done();
}

export function preview_docker(done) {
  const previewer = browserSync.create();
  previewer.init(config.browserSync.proxy);
  done();
}
