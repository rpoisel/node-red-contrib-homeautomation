'use strict'

var fs = require('fs');
var gulp = require('gulp');
var GulpSSH = require('gulp-ssh');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

var config = {
  host: '192.168.88.241',
  port: 22,
  username: 'root',
  privateKey: fs.readFileSync('/home/rpoisel/.ssh/id_rsa')
}

var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config
})

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build-module', function () {
  return gulp.src('homeautomation/*.ts').pipe(tsProject()).js.pipe(gulp.dest('dist'));
})

gulp.task('tslint', () => gulp.src('homeautomation/*.ts').pipe(tslint({ formatter: "stylish" })).pipe(tslint.report()));

gulp.task('uninstall-module', function () {
  return gulpSSH
    .shell(['docker exec -w /data/mynodes nodered npm uninstall node-red-contrib-homeautomation'], { filePath: 'commands.log' })
    .pipe(gulp.dest('logs'));
})

gulp.task('remove-module', function () {
  return gulpSSH
    .exec(['rm -rf /home/rpoisel/node-red-data/mynodes/node-red-contrib-homeautomation'], { filePath: 'commands.log' })
    .pipe(gulp.dest('logs'));
})

gulp.task('deploy-module-meta', function () {
  return gulp
    .src(['package.json'], { base: '.' })
    .pipe(gulpSSH.dest('/home/rpoisel/node-red-data/mynodes/node-red-contrib-homeautomation'));
})

gulp.task('deploy-module-html', function () {
  return gulp
    .src(['homeautomation/**/*.html'], { base: '.' })
    .pipe(gulpSSH.dest('/home/rpoisel/node-red-data/mynodes/node-red-contrib-homeautomation'));
})

gulp.task('deploy-module-js', function () {
  return gulp
    .src(['dist/**/*.js'], { base: 'dist' })
    .pipe(gulpSSH.dest('/home/rpoisel/node-red-data/mynodes/node-red-contrib-homeautomation/homeautomation'));
})

gulp.task('fix-permissions', function () {
  return gulpSSH
    .shell(['chown -R rpoisel:users /home/rpoisel'], { filePath: 'commands.log' })
    .pipe(gulp.dest('logs'));
})

gulp.task('install-module', function () {
  return gulpSSH
    .shell(['docker exec -w /data/mynodes nodered npm install node-red-contrib-homeautomation'], { filePath: 'commands.log' })
    .pipe(gulp.dest('logs'));
})

gulp.task('restart-nodered', function () {
  return gulpSSH
    .exec(['systemctl restart nodered.service'], { filePath: 'commands.log' })
    .pipe(gulp.dest('logs'));
})

gulp.task('default',
  gulp.series(
    'tslint', 'build-module', 'uninstall-module', 'remove-module',
    gulp.parallel('deploy-module-meta', 'deploy-module-html', 'deploy-module-js'),
    'fix-permissions',
    'install-module', 'restart-nodered'), function () { });
