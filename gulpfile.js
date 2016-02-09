var gulp = require('gulp');
var pipe = require('multipipe');
var merge = require('merge-stream');
var del = require('del');
var project = require('./package.json')
var plugins = require('gulp-load-plugins')();
var history = require('connect-history-api-fallback');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

var tsproject = plugins.typescript.createProject('tsconfig.json');



var paths = {
	ts: [
		'src/app.module.ts',
		'src/**/*.module.ts',
		'src/**/*.ts'
	],
	tsdefinitions: 'typings/**/*.d.ts',
	dist: 'dist/'
};

var configs = {
	lint: {
		emitError: false,
		sort: true
	}
}


/**
 * removes css- and js-dist folder.
 */
gulp.task('clean', function() {
	return del([paths.dist]);
})

gulp.task('lint', function() {
	return gulp.src(paths.ts)
		.pipe(plugins.tslint())
		.pipe(plugins.tslint.report(plugins.tslintStylish, {
			emitError: configs.lint.emitError,
			sort: configs.lint.sort
		}));
});

gulp.task('script', ['clean', 'lint'], function() {
	return gulp.src(paths.ts.concat([paths.tsdefinitions]))
		.pipe(plugins.typescript())
		.pipe(plugins.concat(project.name + '.js'))
		.pipe(plugins.ngAnnotate())
		.pipe(gulp.dest(paths.dist))
		.pipe(plugins.uglify())
		.pipe(plugins.concat(project.name + '.min.js'))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('watch', ['build'], function() {
	gulp.watch(paths.ts, ['watch-js']);
	gulp.watch('demo/*.*', ['_browser-reload'])

	browserSync.init({
		server: {
			baseDir: '',
			middleware: [ history() ]
		},
		startPath: '/demo/'
	});
});

gulp.task('watch-script', function(cb) {
	return runSequence(['script'], ['_browser-reload'], cb);
});

gulp.task('_browser-reload', function(cb) {
	browserSync.reload();
	cb();
});

gulp.task('build', ['clean', 'script']);
gulp.task('default', ['build']);
