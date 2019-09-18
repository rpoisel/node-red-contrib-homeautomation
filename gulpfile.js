'use strict'

var fs = require('fs');
var gulp = require('gulp')
var shell = require('gulp-shell')
var GulpSSH = require('gulp-ssh')

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

gulp.task('build-module', shell.task('npm run-script build-ts'));

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

gulp.task('default', gulp.series('build-module', 'uninstall-module', 'remove-module', gulp.parallel('deploy-module-meta', 'deploy-module-html', 'deploy-module-js'), 'install-module', 'restart-nodered'), function () { });
