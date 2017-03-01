//css合并gulp-notify
var gulp        = require('gulp');
var less        = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;  //页面强制刷新
var notify      = require('gulp-notify');//注释
var concat      = require('gulp-concat');//合并
gulp.task('less',function(){
	gulp.src('./src/css/*.less')
	    .pipe(less())
	    .pipe(gulp.dest('./src/css'))
	    .pipe(reload({stream:true}))
	    .pipe(notify("编译less-->css[<%= file.relative %>]"))
})

gulp.task('concat',function(){
	gulp.src(['./src/css/main.css','./src/css/header.css'])
	    .pipe(concat('index.css'))  //合并完的名字index.css
	    .pipe(gulp.dest('./build/css'))
	    .pipe(reload({stream:true}))
	    .pipe(notify("合并css-->css[<%= file.relative%>]"))
})

gulp.task('default',['less','concat'],function(){
	browserSync.init({
		server:{
			baseDir:"./"
		},
		port:8080  //修改端口
	})
	gulp.watch("src/css/*.less",['less','concat']);
})