var gulp = require('gulp');
var pipe = require('multipipe');
var merge = require('merge-stream');
var del = require('del');
var project = require('./package.json')
var plugins = require('gulp-load-plugins')();
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

gulp.task('js', ['clean', 'lint'], function() {
	return gulp.src(paths.ts.concat([paths.tsdefinitions]))
		.pipe(plugins.typescript())
		.pipe(plugins.concat(project.name + '.js'))
		.pipe(plugins.ngAnnotate())
		// .pipe(plugins.uglify())
		.pipe(gulp.dest(paths.dist));
});


gulp.task('build', ['clean', 'js']);
gulp.task('default', ['build']);
