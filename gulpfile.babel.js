import gulp from 'gulp';
import * as task from './gulp_task'

const tasks = [];
const taskGroups = {};
for (const key in task) {
  const groupName = (key.match(/^([^_]*)_/) || [])[1];
  if (groupName) {
    if (!taskGroups[groupName]) {
      taskGroups[groupName] = [];
    }
    const group = taskGroups[groupName];
    group.push(task[key]);
  } else {
    tasks.push(task[key]);
  }
}

export * from './gulp_task'

export const build = gulp.parallel(
  ...taskGroups.build
)

export const watch = gulp.series(
  build,
  gulp.parallel(
    ...taskGroups.watch,
    task.preview
  )
)

export default gulp.series(
  task.clear,
  build
)
