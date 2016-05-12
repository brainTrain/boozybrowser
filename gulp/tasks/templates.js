'use strict';

import config from '../config';
import gulp from 'gulp';
import htmlclean from 'gulp-htmlclean';
import templateCache from 'gulp-angular-templatecache';
import fs from 'fs';
import path from 'path';
import rename from 'gulp-rename';

function getFolders(dir) {
    let folders = [];
    fs.readdirSync(dir)
        .filter(file => fs.statSync(path.join(dir, file)).isDirectory())
        .map(f => {
            let subfolders = getFolders(dir + f + '/');
            if (subfolders.length > 0){
                subfolders.map(sf => folders.push(f + '/' + sf))
            } else {
                folders.push(f);
            }
        });
    return folders;
}

// Templates task
gulp.task('templates', function() {
    // Process the template files inside app/js
    const scriptsPath = config.templates.src;
    const folders = getFolders(scriptsPath);

    return folders.map(folder => {
        let names = folder.split('/');
        let moduleName = names.join('.') + '.templates';
        let fileName = moduleName + '.js';
        if (names.length > 1){
            names.splice(0, 1);
            fileName = names.join('.') + '.templates.js';
        }
        
        return gulp.src(scriptsPath + folder + '/*.html')
            .pipe(htmlclean())
            .pipe(templateCache({
                standalone: true,
                module: moduleName,
                root: folder,
                moduleSystem: 'Browserify'
            }))
            .pipe(rename(fileName))
            .pipe(gulp.dest(scriptsPath + folder));
    });

});

