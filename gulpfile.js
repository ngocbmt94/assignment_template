import pkg from 'gulp';
const { gulp, src, dest, parallel, series, watch } = pkg;

import browserSync from 'browser-sync';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import postCss from 'gulp-postcss';
import cssnano from 'cssnano';
const sassfn = gulpSass(dartSass);
import uglifyim from 'gulp-uglify-es';
const uglify = uglifyim.default;
import rename from 'gulp-rename';
import { deleteAsync } from 'del';
import imageminfn from 'gulp-imagemin';
import cache from 'gulp-cache';
import autoprefixer from 'autoprefixer';
import htmlmin from 'gulp-htmlmin';

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'dist/',
    },
    ghostMode: { clicks: false },
    notify: false,
    online: true,
  });
}

function html() {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function js() {
  return src(['src/js/*.js'])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

function scss() {
  return src('src/css/*.scss')
    .pipe(sassfn())
    .pipe(
      postCss([
        autoprefixer({ grid: 'autoplace' }),
        cssnano({
          preset: ['default', { discardComments: { removeAll: true } }],
        }),
      ])
    )
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function fonts() {
  return src(['node_modules/bootstrap-icons/font/fonts/*.*'])
    .pipe(dest('dist/fonts'))
    .pipe(browserSync.stream());
}

function imagemin() {
  return src(['src/images/**/*']).pipe(imageminfn()).pipe(dest('dist/images/'));
}

async function removedist() {
  await deleteAsync('dist/**/*', { force: true });
}
async function clearcache() {
  cache.clearAll();
}

function startwatch() {
  watch('src/css/*.scss', { usePolling: true }, scss);
  watch(['src/js/*.js'], { usePolling: true }, js);
  watch(['src/*.html'], { usePolling: true }, html).on(
    'change',
    browserSync.reload
  );
}

export default series(
  removedist,
  clearcache,
  js,
  scss,
  imagemin,
  fonts,
  html,
  parallel(browsersync, startwatch)
);
