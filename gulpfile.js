var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var connect = require("gulp-connect");

gulp.task("default", ["build-dev", "static", "serve"]);

gulp.task("build-dev", ["webpack:build-dev"], function() {
  gulp.watch(["app/**/*"], ["webpack:build-dev"]);
});

gulp.task("serve", function() {
	connect.server({
		root: 'dist'
	});
});

var myDevConfig = Object.create(webpackConfig);
myDevConfig.debug = true;

var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('static', function() {
  gulp.src('app/img/**')
    .pipe(gulp.dest('dist/img'));
  gulp.src('app/css/**')
    .pipe(gulp.dest('dist/css'));
  gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});