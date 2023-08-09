import { copyTask } from './copyTask.js'
import { htmlTask } from './htmlTask.js'
import { cssTask } from './cssTask.js'
import { scssTask } from './scssTask.js'
import { jsTask } from './jsTask.js'
import { imgTask } from './imgTask.js'
import { faviconTask } from './faviconTask.js'
import { fontsTask } from './fontsTask.js'

export const watchTask = () => {
  app.gulp.watch(app.paths.watch.files, copyTask)
  app.gulp.watch(app.paths.watch.html, htmlTask)
  app.gulp.watch(app.paths.watch.css, cssTask)
  app.gulp.watch(app.paths.watch.scss, scssTask)
  app.gulp.watch(app.paths.watch.js, jsTask)
  app.gulp.watch(app.paths.watch.img, imgTask)
  app.gulp.watch(app.paths.watch.favicon, faviconTask)
  app.gulp.watch(app.paths.watch.fonts, fontsTask)
}
