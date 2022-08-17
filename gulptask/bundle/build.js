import { default as gulp } from 'gulp';

const taskName = 'build';

gulp.task(taskName, gulp.parallel([
  'html',
  'sass',
  'js',
  'image',
  'other'
]));

gulp.task(taskName + ':noimage', gulp.parallel([
  'html',
  'sass',
  'js',
  'other'
]));

export default gulp.series(taskName)