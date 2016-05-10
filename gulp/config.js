'use strict';

export default {
    port: 4000,
    buildDir: 'public/',
    scripts: {
        src: 'demo/**/*.js',
        dest: 'public/js/'
    },
    styles: {
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
