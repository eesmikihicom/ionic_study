/* 参考：https://qiita.com/Michinosuke/items/11908fd276d1794aedeb */
// Gulp 4系

const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const server = require('browser-sync').create();
const {
    watch,
    series
} = require('gulp');

const paths = {
    scripts: {
        src: './',
        dest: './home/'
    }
};

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

// Reload Server
async function reload() {
    server.reload();
}

// Copy assets after build
async function copyAssets() {
    gulp.src(['assets/**/*'])
        .pipe(gulp.dest(paths.scripts.dest));
}

// Build files html and reload server
async function buildAndReload() {
    await includeHTML();
    await copyAssets();
    reload();
}

async function includeHTML() {
    return gulp.src([
            './home/*.html',
            '!header.html', // ignore
            '!footer.html', // ignore
            '!side.html' // ignore
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(paths.scripts.dest));
}
exports.includeHTML = includeHTML;

async function compileSass() {
    gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css'));
}
// Watch Sass task
watch('./sass/**/*.scss', series(compileSass));

exports.default = async function () {
    // Init serve files from the build folder
    server.init({
        server: {
            baseDir: paths.scripts.dest
        }
    });
    // Build and reload at the first time
    buildAndReload();
    // Watch task
    watch(["./home/*.html", "assets/**/*"], series(buildAndReload));
};
