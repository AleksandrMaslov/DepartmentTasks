export const fontsTask = () => {
  return app.gulp
    .src(`${app.paths.src.fonts}*.{woff,woff2}`)
    .pipe(app.gulp.dest(app.paths.build.fonts))
}
