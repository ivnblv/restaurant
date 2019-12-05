const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const browserSync = require("browser-sync").create();
sass.compiler = require("node-sass");
const minify = require("gulp-minify");

const paths = {
  html: "src/*.html",
  scss: "src/scss/**/*.scss",
  css: "src/css/*.css",
  img: "src/img/**/*",
  img: "src/img/**/*",
  fonts: "src/fonts/**/*",
  js: "src/js/*.js",
  output: "./dist"
};

function compileScss() {
  return gulp
    .src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
}
function dev() {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
  gulp.watch(paths.scss, compileScss);
  gulp.watch(paths.html).on("change", browserSync.reload);
}
exports.dev = dev;

function minifyHTML() {
  return gulp
    .src(paths.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.output));
}
function minifyImg() {
  return gulp
    .src(paths.img)
    .pipe(
      imagemin([
        mozjpeg({ quality: 70 }),
        imagemin.optipng({ optimizationLevel: 7, buffer: true })
      ])
    )
    .pipe(gulp.dest(paths.output + "/img"));
}
function copyFonts() {
  return gulp.src(paths.fonts).pipe(gulp.dest(paths.output + "/fonts"));
}
function minifyCss() {
  return gulp
    .src(paths.css)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(paths.output + "/css"));
}
function minifyJS() {
  return gulp
    .src(paths.js)
    .pipe(
      minify({
        ext: {
          min: ".js"
        },
        noSource: true
      })
    )
    .pipe(gulp.dest(paths.output + "/js"));
}
exports.build = gulp.parallel(
  copyFonts,
  minifyHTML,
  minifyCss,
  minifyJS,
  minifyImg
);
