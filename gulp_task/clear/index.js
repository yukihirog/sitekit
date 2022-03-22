import fs from 'fs';
import cached from 'gulp-cached';
import config from '../config';

function clear(dir) {
  cached.caches = {};

  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }

  fs.mkdirSync(dir);
};

export function clear_preview(done) {
  clear(config.path.preview);
  done();
}

export function clear_release(done) {
  clear(config.path.release);
  done();
}
