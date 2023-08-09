import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())
const buildFolder = './dist'
const sourceFolder = './src'

export const paths = {
  src: {
    html: `${sourceFolder}/*.html`,
    css: `${sourceFolder}/css/style.css`,
    scss: `${sourceFolder}/scss/style.scss`,
    js: `${sourceFolder}/js/app.js`,
    img: `${sourceFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${sourceFolder}/img/**/*.svg`,
    favicon: `${sourceFolder}/favicon/**/*.*`,
    fonts: `${sourceFolder}/fonts/`,
    files: `${sourceFolder}/files/**/*.*`,
    svgicons: `${sourceFolder}/svgicons/*.svg`,
  },
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    img: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    fontscss: `${sourceFolder}/css/fonts.css`,
    fontsscss: `${sourceFolder}/scss/fonts.scss`,
    favicon: `${buildFolder}/favicon/`,
    files: `${buildFolder}/files/`,
  },
  watch: {
    html: `${sourceFolder}/**/*.html`,
    css: `${sourceFolder}/css/**/*.css`,
    scss: `${sourceFolder}/scss/**/*.scss`,
    js: `${sourceFolder}/js/**/*.js`,
    img: `${sourceFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    favicon: `${sourceFolder}/favicon/**/*.*`,
    fonts: `${sourceFolder}/fonts/*.{woff,woff2}`,
    files: `${sourceFolder}/files/**/*.*`,
  },
  rootFolder: rootFolder,
  cleanFolder: buildFolder,
  buildFolder: buildFolder,
  sourceFolder: sourceFolder,
  ftp: '',
}
