const gulp    = require('gulp');
const rename  = require('gulp-rename');
const webpack = require('webpack-stream');

function testCastDown() 
{
  return gulp.src('./test/test-cast-down.js')
  .pipe(webpack({
    mode: 'development',
  }))
  .pipe(rename('test-cast-down-bundle.js'))
  .pipe(gulp.dest('./test/'));
}

function testHttp() 
{
  return gulp.src('./test/test-http.js')
  .pipe(webpack({
    mode: 'development',
  }))
  .pipe(rename('test-http-bundle.js'))
  .pipe(gulp.dest('./test/'));
}

exports.testCastDown = testCastDown;
exports.testHttp = testHttp;
exports.default = gulp.series(testCastDown, testHttp);