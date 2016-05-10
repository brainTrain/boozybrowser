'use strict';

import gulp from 'gulp';
import config from '../config';

gulp.task('watch', () => {
    gulp.watch(config.scripts.src, ['jshint']);
    gulp.watch(config.scripts.sass, ['sass']);
});
