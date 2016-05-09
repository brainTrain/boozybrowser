'use strict';

import config  from '../config';
import http    from 'http';
import express from 'express';
import gulp    from 'gulp';
import gutil   from 'gulp-util';
import morgan  from 'morgan';

gulp.task('server', function() {

    const server = express();

    // log all requests to the console
    server.use(morgan('dev'));
    server.use(express.static(config.buildDir));
    
    // Serve index.html for all routes to leave routing up to Angular
    server.all('/*', function(req, res) {
        res.sendFile('index.html', { root: 'build' }); 
    }); 

    // Start webserver if not already running
    const s = http.createServer(server);
    s.on('error', function(err){
        if(err.code === 'EADDRINUSE'){
            gutil.log('Development server is already started at port ' + config.serverPort);
        }   
        else {
            console.log('server error:\n', err);
            throw err;
        }   
    }); 

    s.listen(config.serverPort);

});

