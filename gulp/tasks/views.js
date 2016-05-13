'use strict';

import gulp from 'gulp';
import config from '../config';

// Views task
gulp.task('views', () => {
    return gulp.src('demo/*.html')
                .pipe(gulp.dest(config.views.dest));
});
