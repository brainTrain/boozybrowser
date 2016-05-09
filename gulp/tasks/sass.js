'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

gulp.task('sass', () => {
    return gulp.src('media/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .pipe(gulp.dest('media/css'));
});
