//自动刷新任务
var gulp        = require('gulp');
var less        = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;  //自动刷新


gulp.task('less',function(){
	gulp.src('./src/css/main.less')
	    .pipe(less())
	    .pipe(gulp.dest('./build/css'))
	    .pipe(reload({stream:true}));
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