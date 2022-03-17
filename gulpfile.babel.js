import gulp from 'gulp';
import * as task from './gulp_task'

const tasks = [];
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
  taskGroups.deploy.deploy_fixedsrc,
  gulp.parallel(
    ...taskGroups.build
  )
)

export const watch = gulp.series(
  build,
  gulp.parallel(
    ...taskGroups.watch,
    task.preview
  )
)

export const deploy = gulp.series(
  taskGroups.clear.clear,
  build
)

export default gulp.series(
  taskGroups.clear.clear,
  build
)
