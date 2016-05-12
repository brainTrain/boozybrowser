'use strict';

export default {
    port: 4000,
    buildDir: 'public/',
    scripts: {
        src: './demo/**/*.js',
        dest: 'public/js/'
    },
    styles: {
        src: 'media/scss/**/*.scss',
        dest: 'public/css'
    },
    views: {
        src: 'demo/index.html',
        dest: 'public/'
    },
    templates: {
        watch: 'demo/**/*.html',
        src: 'demo/'
    }
};
