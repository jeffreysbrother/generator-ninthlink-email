// generated on <%= date %> using <%= name %> <%= version %>
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const inlineCss = require('gulp-inline-css');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;


gulp.task('html', () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['app', '.']}))
    .pipe(inlineCss())
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['dist']));


gulp.task('serve', () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['app']
    }
  });

  gulp.watch([
    'app/*.html',
    'app/images/**/*'
  ]).on('change', reload);

});

gulp.task('serve:dist', () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});


gulp.task('build', ['html', 'images', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
