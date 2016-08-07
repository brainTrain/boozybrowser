'use strict';

export default {
    port: 4000,
    buildDir: 'public/',
    scripts: {
        appSrc: './react-demo/js/react-boozy-demo.js',
        src: './react-demo/**/*.js',
        boozySrc: './media/js/boozy-browser.js',
        dest: 'public/js/'
    },
    styles: {
        src: 'media/scss/**/*.scss',
        dest: 'public/css'
    },
    views: {
        src: 'react-demo/index.html',
        dest: 'public/'
    },
    templates: {
        watch: 'react-demo/**/*.html',
        src: 'demo/'
    }
};
