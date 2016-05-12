'use strict';

import gulp from 'gulp';
import config from '../config';

gulp.task('watch', () => {
    gulp.watch(config.scripts.src, ['browserify']);
    gulp.watch(config.styles.src, ['styles']);
    gulp.watch(config.views.src, ['views']);
});
