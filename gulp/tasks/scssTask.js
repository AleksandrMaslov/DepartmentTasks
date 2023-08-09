import fs from 'fs'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename'
import cleanCss from 'gulp-clean-css'
import webpCss from 'gulp-webpcss'
import autoprefixer from 'gulp-autoprefixer'
import groupMediaQueries from 'gulp-group-css-media-queries'

const sass = gulpSass(dartSass)

export const scssTask = () => {
  const isActive =
    fs.existsSync(app.paths.src.scss) && !fs.existsSync(app.paths.src.css)

  if (!isActive) {
    console.log('...SCSS is not Active')
    return app.gulp.src(app.paths.src.scss, { allowEmpty: true })
  }

  return app.gulp
    .src(app.paths.src.scss, { sourcemaps: app.isDev, allowEmpty: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SCSS Task',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(
      sass({
        outputStyle: 'expanded',
      })
    )
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
