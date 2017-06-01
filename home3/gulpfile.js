'use strict';
var gulp = require('gulp'),
sass = require('gulp-sass'),
clean = require('gulp-clean'),
//fontAwesome = require('node-font-awesome'),
//googlecdn = require('gulp-google-cdn'),
jade = require('gulp-jade'),
mainfiles= require('main-bower-files'),
autoprefixer = require('gulp-autoprefixer'),
notify = require('gulp-notify');
var paths = {
	scss:['./scss/main.scss'],
	jade:['./*.jade']
};

gulp.task('clean', function (done) {
    return gulp.src('./build', {read: false})
        .pipe(clean());
        done();
});

gulp.task('fonts', function(done){
  gulp.src(mainfiles(['**/*.{otf,ttf,woff2,eot,svg,}'],{
   "overrides":{
    "font-awesome":{
      main:["fonts/*.*"]      
    },
    "bootstrap-sass":{
      "main":["assets/fonts/bootstrap/*.*"]
    }
  }
}))
  .pipe(gulp.dest('./build/fonts'));
  done();
});

gulp.task('js', function(done){
  gulp.src(mainfiles(['**/*.js'],{
   "overrides":{
    "jquery":{
      main:["assets/javascripts/bootstrap.min.js"]      
    },
    "jquery":{
      "main":["./dist/jquery.min.js"]
    },
        "jquery-migrate":{
      "main":["./jquery-migrate.min.js"]
    }
  }
}))
  .pipe(gulp.dest('./build/js'));
  done();
});


/*
gulp.task('cdn', function () {
    return gulp.src('index.html')
        .pipe(googlecdn(require('./bower.json')))
        .pipe(gulp.dest('./dist'));
});
*/
gulp.task('jade', function (done) {
    gulp.src('./src/index.jade')
//        .on('data', function(file){
//        console.log({
//                cwd: file.cwd,
//                relative: file.relative,
//                contents: file.contents
//            })
//        })
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./build'));
      done();
});

gulp.task('scss', function (done) {
	return gulp.src('./scss/main.scss')
	/*.pipe(sass({
      includePaths: [fontAwesome.scssPath]
    }))*/
    .pipe(sass({
     outputStyle: 'expanded'
             }).on('error', sass.logError))
   .pipe(gulp.dest('build/css'));
   done();
});

gulp.task('build', gulp.parallel('jade','scss',function(done){
    done();
}));



//gulp.task('build:watch', function () {
//    gulp.watch(paths.jade,gulp.series('jade'));
//    gulp.watch(paths.scss,gulp.series('scss'));
//});
