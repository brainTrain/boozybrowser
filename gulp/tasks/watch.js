'use strict';

import gulp from 'gulp';
import config from '../config';

gulp.task('watch', () => {
    // TODO: determine if I need this (think I may not)
    //gulp.watch(config.templates.watch, ['templates']);
    gulp.watch(config.scripts.src, ['browserify']);
    gulp.watch(config.styles.src, ['styles']);
    gulp.watch(config.views.src, ['views']);
});
