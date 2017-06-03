const gulp = require('gulp')
const themes = ['default']
const subtasks = []

themes.forEach(theme => {
  subtasks.push(`${theme}-css`)

  gulp.task(`${theme}-css`, function () {
    let sass = require('gulp-sass')
    let sourcemaps = require('gulp-sourcemaps')
    let concat = require('gulp-concat')

    return gulp.src(`app/themes/${theme}/src/**/*.scss`)
      .pipe(concat('bundle.scss'))
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(`app/themes/${theme}/`))
  })
})

gulp.task('default', subtasks)
