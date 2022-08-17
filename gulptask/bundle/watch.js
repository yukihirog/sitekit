import { default as gulp } from 'gulp';

const taskName = 'watch';

gulp.task(taskName, gulp.parallel([
  'html:watch',
  'sass:watch',
  'js:watch',
  'image:watch',
  'other:watch',
]));

export default gulp.series(taskName)