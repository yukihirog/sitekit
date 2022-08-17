import { default as gulp } from 'gulp';

const taskName = 'release';

gulp.task(taskName, gulp.series([
  'clear',
  'build'
]));

gulp.task(taskName + ':noimage', gulp.series([
  'build:noimage'
]));

export default gulp.series(taskName)