var gulp = require('gulp');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;
var jshint       = require('gulp-jshint');

// var appDev = 'assets/app/';
// var appProd = 'public/js/app/';

gulp.task('jshint', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .on('error', swallowError);
});

gulp.task('browser-sync', function() {  
    browserSync.init(['*.js'], {
        server: {   
            baseDir: "./"
        }
    });
});

gulp.task('watch', ['browser-sync'], function () {  

    gulp.watch("*.js", ['jshint']);
    gulp.watch("*.js").on('change', reload);
});

gulp.task('default', ['watch']);