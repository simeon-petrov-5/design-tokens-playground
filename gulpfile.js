// REQUIRED https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const csso = require('gulp-csso');

function buildBaseTokens(callback) {
  const scssPath = "./tokens/base/base-tokens.scss";
  gulp
    .src(scssPath)
    .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
    .pipe(gulp.dest("./public/tokens"));
  callback();
}

function buildContextTokens(callback) {
  const scssPath = "./tokens/context/context-tokens.scss";
  gulp
    .src(scssPath)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./public/tokens"));
  callback();
}

function mergeFiles(callback) {
  const cssPath = "./public/tokens/*.css";
  gulp
    .src(cssPath)
    .pipe(concat("tokens.css"))
    .pipe(csso())
    .pipe(gulp.dest("./public"));
  callback();
}


exports.compressCSS = mergeFiles;
exports.buildCSS = gulp.series(buildBaseTokens, buildContextTokens);

