'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import config from '../config';

gulp.task('styles', () => {
    return gulp.src(config.styles.src)
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .pipe(gulp.dest(config.styles.dest));
});
