var gulp = require('gulp');//引入模块、引入包
//.布置任务：压缩css文件
var cssmin=require('gulp-cssmin');
gulp.task('cssmin',function(){
  return gulp.src('src/css/carts.css')
             .pipe(cssmin())
             .pipe(gulp.dest('dist/css'));
});

//.布置任务：压缩css文件
// var jsmin=require('gulp-uglify');
// gulp.task('jsmin',function(){
//   return gulp.src('src/js/information.js')
//              .pipe(jsmin())
//              .pipe(gulp.dest('dist/js'));
// });

//.布置任务：压缩image文件
var imgmin=require('gulp-uglify');
gulp.task('imgmin',function(){
  return gulp.src('src/**/*.{jpg,png,gif}', { base: 'res' })
             .pipe(imgmin())
             .pipe(gulp.dest('dist/imgages'));
});

gulp.task('default', function() { 
   gulp.start('cssmin', 'imgmin');
});