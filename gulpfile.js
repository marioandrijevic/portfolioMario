const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

const { series } = require('gulp');
const { parallel } = require('gulp');

// Compile SCSS into CSS
function scss() {
    return gulp
        .src('app/styles/scss/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: true,
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('app/styles/.'));
}

// Minify JS file
function js() {
    return gulp
        .src(['src/scripts/*.js'])
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
}

// function assets() {
//   return gulp
//     .src(['src/assets/**/*', '!src/assets/img/' , '!src/assets/svg'])
//     .pipe(gulp.dest('dist/assets/'))
// }

// function imageOpt() {
//   return gulp 
//     .src(['src/assets/**/*.jpg', 'src/assets/**/*.png', 'src/assets/**/*.svg'])
//     .pipe(imagemin([
//       imagemin.gifsicle({interlaced: true}),
//       imagemin.mozjpeg({quality: 100, progressive: true}),
//       imagemin.optipng({optimizationLevel: 0}),
//       imagemin.svgo({
//         plugins: [
//           {removeViewBox: true},
//           {cleanupIDs: false}
//         ]
//       })
//     ]))
//     .pipe(gulp.dest('dist/assets/'))
// }

async function watch() {
    gulp.watch('app/styles/scss/**/*.scss', gulp.series(scss));
    // gulp.watch('src/scripts/script.js', gulp.series(js));
    // gulp.watch('src/assets/**/*', gulp.series(imageOpt, assets));
}

exports.scss = scss;
exports.js = js;
// exports.imageOpt = imageOpt;
// exports.assets = assets;
// exports.build = series(scss, js, imageOpt, assets);
exports.default = watch;