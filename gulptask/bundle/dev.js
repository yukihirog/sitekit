import { default as gulp } from 'gulp';

const taskName = 'dev';

gulp.task(taskName, gulp.series([
  'build',
  gulp.parallel([
    'preview',
    'watch'
  ])
]));

export default gulp.series(taskName)