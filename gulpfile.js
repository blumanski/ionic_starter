var gulp 		= require('gulp');
var gutil 		= require('gulp-util');
var bower 		= require('bower');
var concat 		= require('gulp-concat');
var sass 		= require('gulp-sass');
var minifyCss 	= require('gulp-clean-css');
var rename 		= require('gulp-rename');
var uglify 		= require('gulp-uglify');
var notify 		= require('gulp-notify');
var ngAnnotate 	= require('gulp-ng-annotate');
var rename 		= require('gulp-rename');
var sh 			= require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/min/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/min/css/'))
    .on('end', done);
});

gulp.task('jstop', function(){
	
	gulp.src(['www/lib/ionic/js/ionic.bundle.js',
	          'www/lib/ngCordova/dist/ng-cordova.js',
	          'www/lib/ionic-native-transitions/dist/ionic-native-transitions.js',
	          'www/lib/angular-ui-router/angular-ui-router.js',
	          'www/lib/angular-animate/angular-animate.js',
	          'www/lib/angular-sanitize/angular-sanitize.js'
	        ])
	        .pipe(ngAnnotate())
	        .pipe(concat('topscripts.js'))
	        .pipe(uglify())
	        .pipe(gulp.dest('./www/min/js/'))
	        .pipe(notify({ message: 'Finished minifying JavaScript'}));
});

gulp.task('jsbottom', function(){
	
	gulp.src(['www/js/app.js', 
	          'www/js/config.js', 
	          'www/js/controllers.js',
	          'www/js/routes.js',
	          'www/js/shared/services/services.js',
	          'www/js/shared/directives/directives.js',
	          'www/js/modules/app/appcontroller.js',
	          'www/js/modules/search/searchcontroller.js'
	        ])
	        .pipe(ngAnnotate())
	        .pipe(concat('bottomscripts.js'))
	        .pipe(uglify())
	        .pipe(gulp.dest('./www/min/js/'))
	        .pipe(notify({ message: 'Finished minifying JavaScript'}));
});

gulp.task('alljs', ['jstop', 'jsbottom']);
gulp.task('allsass', ['sass']);
