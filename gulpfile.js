const gulp = require('gulp')
const themes = ['default']
const subtasks = []

themes.forEach(theme => {
  const taskName = `${theme}-theme`
  subtasks.push(taskName)

  gulp.task(taskName, function () {
    let sass = require('gulp-sass')
    let sourcemaps = require('gulp-sourcemaps')
    let rename = require('gulp-rename')

    return gulp.src(`app/themes/${theme}/src/main.scss`)
      .pipe(rename('bundle.scss'))
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(`app/themes/${theme}/`))
  })
})

gulp.task('default', subtasks)
