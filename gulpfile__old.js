/* 参考：https://qiita.com/Michinosuke/items/11908fd276d1794aedeb */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sassGlob = require('gulp-sass-glob');
var cleanCSS = require('gulp-clean-css');
const through2 = require('through2');

// Sassをコンパイルするタスクの設定
gulp.task("css", function () {
     return gulp.src(['assets/scss/**/*.scss', '!./sass/**/_*.scss']) // コンパイル対象のSassファイル
         .pipe(plumber({
             errorHandler: notify.onError('<%= error.message %>')
        }))
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        //.pipe(strip())
       .pipe(autoprefixer())
        .pipe(cleanCSS())
     .pipe(sass().on('error', sass.logError))
       // タイムスタンプを書き換える
       .pipe(through2.obj((chunk, enc, callback) => {
           const date = new Date();
           chunk.stat.atime = date;
           chunk.stat.mtime = date;
           callback(null, chunk);
       }))
       .pipe(gulp.dest('./')); // 出力
});


/*
//minify
gulp.task('minify-css', function () {
    return gulp.src("assets/dist/style.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest('assets/dist/'));
});
*/
gulp.task("default", function () {
    // scssフォルダを監視し、変更があったらコンパイルする
    gulp.watch('assets/scss/**/*.scss', gulp.series('css'));
    //gulp.watch('assets/scss/**/*.scss', gulp.series(['css', 'minify-css']));
});
