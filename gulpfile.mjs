/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import cssnanoAdvanced from 'cssnano-preset-advanced';
import autoprefixer from 'autoprefixer';
import mergeMediaQueries from 'gulp-merge-media-queries';
import comment from 'gulp-header-comment';
import rename from 'gulp-rename';

const { src, dest } = gulp;
const sass = gulpSass(dartSass);
const license = "© 2022 Frastyle CSS Framework v<%= pkg.version %> | Made in Indonesia and licensed under <%= pkg.license %> License | Creator: <%= pkg.author %> | Generated on <%= moment().format('DD MMM YYYY') %>.";
const preset = cssnanoAdvanced({
  normalizeWhitespace: false,
  reduceIdents: false,
  reduceInitial: false,
});
const sassConfig = {
  outputStyle: 'expanded',
  includePaths: ['./node_modules'],
};

export const compile = () => src('src/**/*.scss')
  .pipe(sass(sassConfig).on('error', sass.logError))
  .pipe(
    mergeMediaQueries({
      log: true,
    }),
  )
  .pipe(postcss([cssnano({ preset }), autoprefixer()]))
  .pipe(comment(license))
  .pipe(dest('dist/css'));

export const minify = () => src(['dist/css/**/*.css', '!dist/css/**/*.min.css'])
  .pipe(postcss([cssnano()]))
  .pipe(comment(license))
  .pipe(rename({ suffix: '.min' }))
  .pipe(dest('dist/css'));
