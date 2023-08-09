export const serverTask = (done) => {
  app.plugins.browsersync.init({
    server: { baseDir: `${app.paths.build.html}` },
    notify: false,
    port: 3000,
  })
}
