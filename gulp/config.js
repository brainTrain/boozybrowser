'use strict';

export default {
    browserPort: 3000,
    UIPort: 3001,
    serverPort: 3002,
    root: 'build',
    port: 4000,
    scripts: {
        src: 'demo/**/*.js',
        dest: 'public/js/'
    },
    sass: {
        src: 'media/scss/**/*.scss',
        dest: 'public/css'
    },
    views: {
        index: 'demo/index.html',
        watch: [
            'demo/*.html'
        ],
        dest: 'public/',
        src: 'demo/**/*.js'
    },
    templates: {
        watch: [
            'demo/**/*.html'
        ],
        src: 'public/js/'
    }
};
