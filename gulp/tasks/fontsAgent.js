import fs from 'fs'
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

const renewFontsStyle = (fontFileNames) => {
  let extensions = ['css', 'scss']
  extensions
    .filter((extension) => fs.existsSync(app.paths.src[extension]))
    .forEach((extension) => {
      let fontStylePath = app.paths.build[`fonts${extension}`]
      writeStyleFile(fontStylePath, fontFileNames)
    })
}
const writeStyleFile = (fontStylePath, fontFileNames) => {
  fs.unlink(fontStylePath, () => {})
  fs.writeFile(fontStylePath, '', () => {})
  fontFileNames.forEach((fontFileName) => {
    let [fontName, fontWeight] = fontFileName.split('-')
    fontWeight = getFontWeight(fontWeight)
    let fontRecord = `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url('../fonts/${fontFileName}.woff2') format('woff2'), url('../fonts/${fontFileName}.woff') format('woff');\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n\n`
    fs.appendFile(fontStylePath, fontRecord, () => {})
  })
}
const getFontWeight = (fontWeight) => {
  if (!fontWeight) return 400
  let lowercased = fontWeight.toLocaleLowerCase()
  if (lowercased === 'thin') return 100
  if (lowercased === 'extralight') return 200
  if (lowercased === 'light') return 300
  if (lowercased === 'medium') return 500
  if (lowercased === 'semibold') return 600
  if (lowercased === 'bold') return 700
  if (lowercased === 'extrabold') return 800
  if (lowercased === 'heavy') return 800
  if (lowercased === 'black') return 900
  return 400
}

export const otfToTtf = () => {
  return app.gulp
    .src(`${app.paths.src.fonts}*.otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FONTS AGENT',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      fonter({
        formats: ['ttf'],
      })
    )
    .pipe(app.gulp.dest(`${app.paths.src.fonts}`))
}
export const ttfToWoff = () => {
  fs.readdir(app.paths.src.fonts, function (err, fontsSourceFiles) {
    let woffs = fontsSourceFiles
      .map((fileName) => fileName.split('.'))
      .filter((fileName) => fileName[1] === 'woff')
      .map((fileName) => fileName[0])
    let fontFiles = fontsSourceFiles.filter(
      (fileName) => fileName.split('.')[1] === 'ttf'
    )

    fontFiles.forEach((fileName) => {
      if (!woffs.includes(fileName.split('.')[0])) {
        app.gulp
          .src(`${app.paths.src.fonts}${fileName}`, {})
          .pipe(
            app.plugins.plumber(
              app.plugins.notify.onError({
                title: 'FONTS AGENT',
                message: 'Error: <%= error.message %>',
              })
            )
          )
          .pipe(
            fonter({
              formats: ['woff'],
            })
          )
          .pipe(app.gulp.dest(`${app.paths.src.fonts}`))
        app.gulp
          .src(`${app.paths.src.fonts}${fileName}`, {})
          .pipe(
            app.plugins.plumber(
              app.plugins.notify.onError({
                title: 'FONTS AGENT',
                message: 'Error: <%= error.message %>',
              })
            )
          )
          .pipe(ttf2woff2())
          .pipe(app.gulp.dest(`${app.paths.src.fonts}`))
      }
    })

    let fontFileNames = fontFiles.map((file) => file.split('.')[0])
    renewFontsStyle(fontFileNames)
  })
  return app.gulp.src(`${app.paths.src.fonts}`, {})
}
