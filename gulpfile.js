var gulp = require("gulp");
var sass=require("gulp-sass-china");
var concat=require("gulp-concat");
var uglify=require("gulp-uglify");
var rename=require("gulp-rename");
var inject=require("gulp-inject");
var connect=require("gulp-connect");
var watch=require("gulp-watch");
var imagemin=require("gulp-imagemin");


gulp.task("css",function(){
    gulp.src("resource/scss/*.scss")
        .pipe(concat("all.scss"))
        .pipe(rename("all.min.css"))
        .pipe(gulp.dest("dest/css/"))
        .pipe(connect.reload())
});
gulp.task("javascript",function(){
    gulp.src("resource/js/*.js")
        .pipe(uglify())
        .pipe(rename("all.min.js"))
        .pipe(gulp.dest("dest/js/"))
        .pipe(connect.reload())
});
gulp.task("html",function(){
    gulp.src("resource/01.html")
        .pipe(gulp.dest("dest/"))
        .pipe(inject(gulp.src(["dest/css/all.min.css","dest/js/all.min.js"]),{relative:true}))
        .pipe(gulp.dest("dest/"))
        .pipe(connect.reload());
});
gulp.task("server",function(){
    connect.server({
        port:8001,
        root:"dest",
        livereload:true
    });
});
gulp.task("img",function(){
    gulp.src("resource/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dest/images/"))
})
gulp.task("watch",function(){
    gulp.watch(["./resource/01.html"],["html"]);
    gulp.watch(["./resource/scss/*.scss"],["css"]);
    gulp.watch(["./resource/js/*.js"],["javascript"]);
    watch("./resource/images/*",function(){
        gulp.src("resource/images/*")
            .pipe(imagemin())
            .pipe(gulp.dest("dest/images/"))
    })
});
gulp.task("default",["html","css","javascript","server","watch","img"]);