//Browersync集成指南
var gulp        = require('gulp');
var less        = require('gulp-less');
var browserSync = require('browser-sync').create();

//静态服务器
gulp.task('server',function(){
	browserSync.init({
		server:{
			baseDir:"./"
		},
		port:8080  //修改端口
	})
})