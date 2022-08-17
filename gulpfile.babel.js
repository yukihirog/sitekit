import fs from 'fs';
import config from './config/index.js';
import { default as gulp } from 'gulp';
import gulptask from './gulptask/index.js';

if (!fs.existsSync(config.src)) {
  fs.mkdirSync(config.src, { recursive: true });
}

if (!fs.existsSync(config.dest)) {
  fs.mkdirSync(config.dest, { recursive: true });
}

gulp.task('default', gulptask.bundle.dev);
export default gulp.series('default')