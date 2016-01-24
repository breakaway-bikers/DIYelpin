// Load plugins
var gulp = require('gulp'),
    serve = require('gulp-serve'),
    karma = require('gulp-karma'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');

// tests
gulp.task('test', function() {
  // Be sure to return the stream
  // NOTE: passing in a fake directory as a placeholder.  Gulp will run the files listed in karma conf file.
  return gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run',
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      this.emit('end'); //instead of erroring the stream, end it
    });
});

// DOES NOT WORK PROPERLY
gulp.task('serve', serve({
  root: 'localhost',
  port: 3000,
}));

gulp.task('autotest', function() {
  return gulp.watch(['client/**/*.js'], ['test']);
});

// Styles
gulp.task('styles', function() {
  return gulp.src('client/style.css', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('client/**/*.js')

    // TODO: set up our linter rules, just commenting them out for now.
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Clean
// This removes files from our dist directory.
gulp.task('clean', function() {
  return del(['dist/styles', 'dist/scripts', 'dist/images']);
});

// Default task
// Cleans the dist dir. then runs the styles and script tasks
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('client/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('client/**/*.js', ['scripts']);

});
