import gulp from 'gulp'
import { paths } from './gulp/config/paths.js'
import { plugins } from './gulp/config/plugins.js'

import { copyTask } from './gulp/tasks/copyTask.js'
import { cleanTask } from './gulp/tasks/cleanTask.js'
import { watchTask } from './gulp/tasks/watchTask.js'
import { htmlTask } from './gulp/tasks/htmlTask.js'
import { cssTask } from './gulp/tasks/cssTask.js'
import { scssTask } from './gulp/tasks/scssTask.js'
import { jsTask } from './gulp/tasks/jsTask.js'
import { imgTask } from './gulp/tasks/imgTask.js'
import { svgTask } from './gulp/tasks/svgTask.js'
import { faviconTask } from './gulp/tasks/faviconTask.js'
import { fontsTask } from './gulp/tasks/fontsTask.js'
import { serverTask } from './gulp/tasks/serverTask.js'
import { otfToTtf, ttfToWoff } from './gulp/tasks/fontsAgent.js'

global.app = {
  gulp: gulp,
  paths: paths,
  plugins: plugins,
  isDev: !process.argv.includes('--build'),
  isBuild: process.argv.includes('--build'),
}

const mainTasks = gulp.parallel(
  copyTask,
  htmlTask,
  cssTask,
  scssTask,
  jsTask,
  imgTask,
  faviconTask,
  fontsTask
)
const liveTasks = gulp.parallel(watchTask, serverTask)
const devMode = gulp.series(cleanTask, mainTasks, liveTasks)
const buildMode = gulp.series(cleanTask, mainTasks)

const prepareFonts = gulp.series(otfToTtf, ttfToWoff)
export { svgTask, prepareFonts, devMode, buildMode }
gulp.task('default', devMode)
