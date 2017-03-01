//js文件操作和changed
var gulp        = require('gulp');
var less        = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;  //页面强制刷新
var notify      = require('gulp-notify');//注释
var concat      = require('gulp-concat');//合并(css和js)
var cleancss    = require('gulp-clean-css') //css压缩
var rev         = require('gulp-rev');  //版本控制
var revCollector= require('gulp-rev-collector');//路径修改器
var runSequence = require('run-sequence'); //同步异步处理器
var del         = require('del');//删除
var vinylPaths  = require('vinyl-paths')//管道删除
var base64      = require('gulp-base64');
var fs          = require('fs') //文件处理模块 node自带
var imagemin    = require('gulp-imagemin');//图片压缩
var spriter     = require('gulp-css-spriter');//雪碧图
var babel       = require('gulp-babel');// es6-->es5
var uglify      = require('gulp-uglify');//js压缩
var rename      = require('gulp-rename'); //改名字
var changed     = require('gulp-changed');//watch的时候只编译改变的文件

gulp.task('js',function(){
	gulp.src(['./src/js/a.js','./src/js/b.js'])
	    .pipe(concat('index.js'))
	    .pipe(gulp.dest('./src/js'))
	gulp.src('.src/js/index.js')
	    .pipe(babel({
	    	presets:['es2015']
	    }))
	    .pipe(uglify())//压缩
	    .pipe(rename('./index.min.js')) //相对于./src/js路径
	    .pipe(gulp.dest('./build/js'))
})

gulp.task('del',function(){   //执行gulp del
	del([
        './build/',
        './rev'
		])
})



gulp.task('css',function(){
	gulp.src('./src/css/*.less')
	    .pipe(less())
	    .pipe(gulp.dest('./src/css'))
	    .pipe(reload({stream:true}))
	    .pipe(notify("编译less-->css[<%= file.relative %>]"))

	gulp.src(['./src/css/main.css','./src/css/header.css'])
	    .pipe(concat('index.css'))  //合并完的名字index.css
	    
	    .pipe(spriter({  //只支持png jpg
	    	'spriteSheet':'./build/images/spritesheet.png',  //雪碧图生成的文件地址
	    	'pathToSpriteSheetFromCSS':'../images/spritesheet.png'  //把css里的所有图片名称改为spritesheet.png
	    }))


	    //.pipe(base64())
	    .pipe(base64({
	    	maxImageSize:8*1024,
	    	debug:true
	    }))
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
	    .pipe(imagemin())
	    .pipe(gulp.dest('./build/images'))
})

/*gulp.task('html',function(){
	gulp.src('./src/*.html')
	    .pipe(gulp.dest('./build/'))
})*/

gulp.task('temp',function(){
	fs.exists('./rev/rev-manifest.json',function(aaaaa){   //./rev/rev-manifest.json是否存在
        console.log(aaaaa);    //布尔值
	})
})

gulp.task('html',function(){
	fs.exists('./rev/rev-manifest.json',function(aaaaa){
        console.log(aaaaa);    //布尔值
        if(aaaaa==true){
            gulp.src(['./rev/*.json','./src/*.html'])
                .pipe(changed('./src/*.html'))
			    .pipe(revCollector())
			    .pipe(gulp.dest('./build/'))
			    .pipe(reload({stream:true}))
        }else{
        	console.log('nothing:./rev/rev-manifest.json')
             runSequence('html')  
        }
	})
	
})

//gulp.task('default',['images','less','concat','html'],function(){ //异步执行的
	gulp.task('default',function(){ //异步执行的
	//gulp.src('./dev')
	//    .pipe(vinylPaths(del))  //开始之前先删除再写进去  不建议用
	runSequence('images','css','html')  
	browserSync.init({
		server:{
			baseDir:"./build/"
		},
		port:8080  //修改端口
	})
	gulp.watch("src/css/*.less",['images','css','html']);
    gulp.watch("src/*.html",['html']);
})