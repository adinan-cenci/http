const gulp    = require('gulp');
const rename  = require('gulp-rename');
const webpack = require('webpack-stream');

function compileDist() 
{
  return gulp.src('./dist.js')
  .pipe(webpack())
  .pipe(rename('http.min.js'))
  .pipe(gulp.dest('./dist/'));
}

function compileTestFile() 
{
  return gulp.src('./tests/test-index.js')
  .pipe(webpack({
    mode: 'development',
  }))
  .pipe(rename('test-index-compiled.js'))
  .pipe(gulp.dest('./tests/'));
}

exports.default = gulp.series(compileDist, compileTestFile);