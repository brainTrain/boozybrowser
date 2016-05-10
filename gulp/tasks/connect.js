import gulp from 'gulp';
import connect from 'gulp-connect';
import config from '../config';

gulp.task('connect', function () {
    connect.server({
        root: config.buildDir,
        port: config.port
    });
});
