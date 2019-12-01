const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
sass.compiler = require("node-sass");

const paths = {
  html: "src/*.html",
  scss: "src/scss/**/*.scss",
  css: "src/css/*.css",
  img: "src/img/**/*",
  output: "./dist"
};

function compileScss() {
  return gulp
    .src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
  gulp.watch(paths.scss, compileScss);
  gulp.watch(paths.html).on("change", browserSync.reload);
}
exports.compileScss = compileScss;
exports.watch = watch;

function minifyHTML() {
  return gulp
    .src(paths.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.output));
}
function minifyImg() {
  return gulp
    .src(paths.img)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.output + "./img"));
}
function minifyCss() {
  gulp
    .src(paths.css)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(paths.output + "/css"));
}
