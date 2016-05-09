'use strict';

import gulp from 'gulp';
import config from '../config';
import jshint from 'gulp-jshint';

gulp.task('jshint', () => {
    return gulp.src(config.scripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
