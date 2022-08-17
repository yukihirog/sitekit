import { default as gulp } from 'gulp';
import gulptask from './gulptask/index.js';

gulp.task('default', gulptask.bundle.dev);
export default gulp.series('default')