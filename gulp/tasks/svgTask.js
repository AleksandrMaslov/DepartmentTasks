import svgSprite from 'gulp-svg-sprite'

export const svgTask = () => {
  return app.gulp
    .src(app.paths.src.svgicons)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SVG Task',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../icons/icons.svg',
            example: true,
          },
        },
      })
    )
    .pipe(app.gulp.dest(app.paths.build.img))
}
