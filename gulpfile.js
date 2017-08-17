var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');


gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});
gulp.task('trans', () =>
    gulp.src('app.js')
        .pipe(babel({
    presets: ['react', 'es2015']
}))
        .pipe(gulp.dest('dist'))
);

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
    gulp.watch('app.js',['trans']);
});
