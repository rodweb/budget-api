const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('tslint', () => {
  tsProject.src()
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report());
});

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('app/**/*.ts', ['scripts', 'tslint']);
});

gulp.task('default', ['watch', 'tslint']);
