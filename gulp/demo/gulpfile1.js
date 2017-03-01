//gulp安装
var gulp = require('gulp');
var less = require('gulp-less');
gulp.task('default',function(){
	console.log(123456789);
});

gulp.task('less',function(){
	gulp.src('./src/css/main.less')
	    .pipe(less())
	    .pipe(gulp.dest('./build/css'))
})