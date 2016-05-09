'use strict';

import config      from '../config';
import url         from 'url';
import browserSync from 'browser-sync';
import gulp        from 'gulp';

gulp.task('browserSync', function() {

    browserSync({
        port: config.browserPort,
        ui: {
            port: config.UIPort
        },  
        proxy: 'localhost:' + config.serverPort,
        open: false
    }); 

});
