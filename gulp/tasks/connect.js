'use-strict';

import gulp from 'gulp';
import connect from 'gulp-connect';
import config from '../config';

gulp.task('connect', () => {
    connect.server({
        livereload: true,
        root: config.buildDir,
        port: config.port
    });
});
