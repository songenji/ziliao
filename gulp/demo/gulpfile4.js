//gulp-notify
var gulp        = require('gulp');
var less        = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;  //自动刷新
var notify      = require('gulp-notify');//注释

gulp.task('less',function(){
	gulp.src('./src/css/main.less')
	    .pipe(less())
	    .pipe(gulp.dest('./build/css'))
	    .pipe(reload({stream:true}))
	    .pipe(notify("完成了less-->css[<%= file.relative %>]"))
})

gulp.task('server',['less'],function(){
	browserSync.init({
		server:{
			baseDir:"./"
		},
		port:8080  //修改端口
	})
	gulp.watch("src/css/*.less",['less']);
})