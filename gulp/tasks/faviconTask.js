export const faviconTask = () => {
  return app.gulp
    .src(app.paths.src.favicon)
    .pipe(app.gulp.dest(app.paths.build.favicon))
}
