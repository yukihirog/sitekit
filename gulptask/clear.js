import config from '../config/index.js';
import fs from 'fs';
import path from 'path';
import { default as gulp } from 'gulp';
import cached from 'gulp-cached';

const taskName = 'clear';

gulp.task(taskName, (done) => {
  cached.caches = {};

  const dest = path.resolve(process.cwd(), config.dest);

  if (fs.existsSync(dest)) {
    fs.rmSync(dest, {
      recursive: true,
      force: true
    });
  }

  fs.mkdirSync(dest);

  done();
});

export default gulp.series(taskName)