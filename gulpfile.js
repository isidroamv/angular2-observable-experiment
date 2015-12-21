var gulp = require('gulp');

var PATHS = {
    src: 'src/**/*.ts',
    sass_main: './src/components/style.scss',
    sass_files: 'src/**/*.scss'
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    gulp.src(PATHS.src)
        .pipe(typescript(tscConfig.compilerOptions));

    //return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    var sass = require('gulp-sass');

    return gulp.src(PATHS.sass_main)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'));
});

gulp.task('play', ['sass','ts2js'], function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src, ['ts2js']);
    gulp.watch(PATHS.sass_files, ['sass']);

    app = connect().use(serveStatic(__dirname));
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

gulp.task('default', ['play']);
