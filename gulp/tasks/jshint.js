'use strict';

import gulp from 'gulp';
import jshint from 'gulp-jshint';

gulp.task('jshint', () => {
    return gulp.src('media/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

