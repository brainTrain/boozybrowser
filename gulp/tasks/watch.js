'use strict';

import gulp from 'gulp';

gulp.task('watch', () => {
    gulp.watch('media/js/**/*.js', ['jshint']);
    gulp.watch('media/scss/**/*.scss', ['sass']);
});
