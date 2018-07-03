var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    ts = require('gulp-typescript'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path');

var paths = {
    sass: ['./scss/**/*.scss'],
    tsFiles: ['app/**/*.ts']
};

var tsProject = ts.createProject('app/tsconfig.json');

/** COMPILE TS */
gulp.task('ts', function() {
    var tsResult = tsProject
        .src()
        .pipe(tsProject());

    return (
        tsResult.js
        .pipe(gulp.dest('public'))
    );
});

gulp.task('watch-ts', function() {
    gulp.watch(paths.tsFiles, ['ts']);
});
/** END OF COMPILE TS */

/** COMPILE SASS */
// gulp.task('sass', function(done) {
//     gulp
//         .src('./scss/style.scss')
//         .pipe(sourcemaps.init())
//         .pipe(sass())
//         .pipe(gulp.dest('./public/css/'))
//         .pipe(
//             minifyCss({
//                 keepSpecialComments: 0
//             })
//         )
//         .pipe(
//             rename({
//                 extname: '.min.css'
//             })
//         )
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('./public/css/'))
//         .on('end', done);
// });

// gulp.task('watch-sass', function() {
//     gulp.watch(paths.sass, ['sass']);
// });
/** END OF COMPILE SASS */

gulp.task('default', ['ts', 'watch-ts'], function() {
    var options = {
        script: 'bin/www',
        delayTime: 1,
        env: {
            'PORT': 3000
        }
    };
    return nodemon(options)
        .on('restart', function(ev) {
            console.log('Restarting...');
        });
});