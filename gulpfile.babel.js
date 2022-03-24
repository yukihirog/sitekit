import gulp from 'gulp';
import * as task from './gulp_task'

const taskGroups = {};
for (const key in task) {
  const groupName = (key.match(/^([^_]*)_/) || [])[1] || key;

  if (!taskGroups[groupName]) {
    taskGroups[groupName] = [];
  }

  const group = taskGroups[groupName];
  group.push(task[key]);
  group[key] = task[key];
}

export * from './gulp_task'

export const build = gulp.series(
  taskGroups.deploy.deploy_fixed,
  gulp.parallel(
    ...taskGroups.build
  )
)

export const clearbuild = gulp.series(
  taskGroups.clear.clear_preview,
  build
)

export const devBS = gulp.series(
  build,
  gulp.parallel(
    ...taskGroups.watch,
    taskGroups.preview.preview_plain
  )
)

export const dev = gulp.series(
  build,
  gulp.parallel(
    ...taskGroups.watch,
    taskGroups.preview.preview_docker
  )
)

export const release = gulp.series(
  taskGroups.clear.clear_release,
  gulp.parallel(
    ...taskGroups.release
  )
)

export default gulp.series(
  devBS
)
