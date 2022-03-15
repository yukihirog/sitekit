import fs from 'fs';
import cached from 'gulp-cached';
import config from '../config';

export function clear(done) {
  cached.caches = {};

  if (fs.existsSync(config.dest)) {
    fs.rmSync(config.dest, { recursive: true });
  }

  fs.mkdirSync(config.dest);

  done();
}
