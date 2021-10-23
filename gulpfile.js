const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourceMaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const beautify = require('gulp-cssbeautify');
const combineMQ = require('gulp-merge-media-queries');
const comment = require('gulp-header-comment');
const rename = require('gulp-rename');

const compile = () => {
	var sassConfig = {
		outputStyle: 'expanded',
		includePaths: ['./node_modules'],
	};
	return (
		src('src/**/*.scss')
			.pipe(sourceMaps.init())
			.pipe(sass(sassConfig).on('error', sass.logError))
			.pipe(postcss([autoprefixer()]))
			.pipe(
				comment(
					`© 2021 Frastyle CSS Framework v<%= pkg.version %>. Made in Indonesia and licensed under <%= pkg.license %> License. Author: <%= pkg.author %>. Generated on <%= moment().format('MM YYYY') %>`
				)
			)
			.pipe(
				beautify({
					autosemicolon: true,
				})
			)
			.pipe(
				combineMQ({
					log: true,
				})
			)
			.pipe(dest('dist/css'))
	);
};

const minify = () => {
	return src(['dist/css/**/*.css', '!dist/css/**/*.min.css'])
		.pipe(postcss([cssnano()]))
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest('dist/css'));
};

exports.compile = compile;
exports.minify = minify;
