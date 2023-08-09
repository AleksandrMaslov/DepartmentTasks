import webpack from 'webpack-stream'

export const jsTask = () => {
  return app.gulp
    .src(app.paths.src.js, { sourcemap: app.isDev, allowEmpty: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'JS Task',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      webpack({
        mode: app.isBuild ? 'production' : 'development',
        output: {
          filename: 'app.min.js',
        },
      })
    )
    .pipe(app.gulp.dest(app.paths.build.js))
    .pipe(app.plugins.browsersync.stream())
}
