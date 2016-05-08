'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import jshint from 'gulp-jshint';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

gulp.task('default', ['watch']);

gulp.task('jshint', function() {
    return gulp.src('media/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('css', function() {
    return gulp.src('media/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .pipe(gulp.dest('media/css'));
});

gulp.task('watch', function() {
    gulp.watch('media/js/**/*.js', ['jshint']);
    gulp.watch('media/scss/**/*.scss', ['css']);
});
