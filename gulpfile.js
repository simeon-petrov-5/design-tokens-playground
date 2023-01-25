const { src, dest, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const csso = require('gulp-csso');
const fs = require('fs');

function buildBaseTokens() {
  const scssPath = "./tokens/base/base-tokens.scss";
  return src(scssPath)
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./dist/tokens"))
}

function buildContextTokens() {
  const scssPath = "./tokens/context/context-tokens.scss";
  return src(scssPath)
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./dist/tokens"))
}

function mergeCSS() {
  const cssPath = "./dist/tokens/*.css";
  return src(cssPath)
    .pipe(concat("tokens.css"))
    .pipe(csso())
    .pipe(dest("./dist/"))
}

function clean() {
  return new Promise((resolve) => {
    fs.rmSync('./dist/tokens', { recursive: true, force: true });
    resolve();
  })
}


exports.buildCSS = series(buildBaseTokens, buildContextTokens, mergeCSS, clean);

