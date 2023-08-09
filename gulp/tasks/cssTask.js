import fs from 'fs'
import rename from 'gulp-rename'
import cleanCss from 'gulp-clean-css'
import webpCss from 'gulp-webpcss'
import importCss from 'gulp-cssimport'
import autoprefixer from 'gulp-autoprefixer'
import groupMediaQueries from 'gulp-group-css-media-queries'

export const cssTask = () => {
  const isActive =
    fs.existsSync(app.paths.src.css) && !fs.existsSync(app.paths.src.scss)

  if (!isActive) {
    console.log('...CSS is not Active')
    return app.gulp.src(app.paths.src.css, { allowEmpty: true })
  }

  return app.gulp
    .src(app.paths.src.css, { sourcemaps: app.isDev, allowEmpty: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'CSS Task',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(importCss())
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(app.plugins.if(app.isBuild, groupMediaQueries()))
    .pipe(
      app.plugins.if(
        app.isBuild,
        webpCss({
          webpClass: '.webp',
          noWebpClass: '.no-webp',
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ['last 3 versions'],
          cascade: true,
        })
      )
    )
    .pipe(app.gulp.dest(app.paths.build.css))
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: '.min.css',
      })
    )
    .pipe(app.gulp.dest(app.paths.build.css))
    .pipe(app.plugins.browsersync.stream())
}
