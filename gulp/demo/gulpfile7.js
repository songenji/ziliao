//版本控制
var gulp        = require('gulp');
var less        = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;  //页面强制刷新
var notify      = require('gulp-notify');//注释
var concat      = require('gulp-concat');//合并
var cleancss    = require('gulp-clean-css') //css压缩
var rev         = require('gulp-rev');  //版本控制
var revCollector= require('gulp-rev-collector');//路径修改器
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
	    .pipe(cleancss())   //压缩
	    .pipe(rev()) //版本控制
	    .pipe(gulp.dest('./build/css'))
        .pipe(rev.manifest())  //生成一个rev-manifest.json
        .pipe(gulp.dest('./rev'))

	    .pipe(reload({stream:true}))
	    .pipe(notify("合并css-->css[<%= file.relative%>]"))
})

gulp.task('images',function(){   //图片位置转移
	gulp.src('./src/images/*.*')
	    .pipe(gulp.dest('./build/images'))
})

gulp.task('rev',function(){
	gulp.src(['./rev/*.json','./index.html'])
	    .pipe(revCollector())
	    .pipe(gulp.dest('./'))
})

gulp.task('default',['images','less','concat','rev'],function(){
	browserSync.init({
		server:{
			baseDir:"./"
		},
		port:8080  //修改端口
	})
	gulp.watch("src/css/*.less",['less','concat']);
})