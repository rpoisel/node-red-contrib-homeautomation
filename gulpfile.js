'use strict'
 
var fs = require('fs');
var gulp = require('gulp')
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

gulp.task('uninstall-module', function () {
  return gulpSSH
    .shell(['docker exec -w /data/mynodes nodered npm uninstall node-red-contrib-homeautomation'], {filePath: 'commands.log'})
    .pipe(gulp.dest('logs'));
})

gulp.task('remove-module', function () {
  return gulpSSH
    .exec(['rm -rf /home/rpoisel/node-red-data/mynodes/node-red-contrib-homeautomation'], {filePath: 'commands.log'})
    .pipe(gulp.dest('logs'));
})
 
gulp.task('deploy-module', function () {
  return gulp
    .src(['package.json', 'homeautomation/**/*'], { base: '.' })
    .pipe(gulpSSH.dest('/home/rpoisel/node-red-data/mynodes/node-red-contrib-homeautomation'));
})

gulp.task('install-module', function () {
  return gulpSSH
    .shell(['docker exec -w /data/mynodes nodered npm install node-red-contrib-homeautomation'], {filePath: 'commands.log'})
    .pipe(gulp.dest('logs'));
})

gulp.task('restart-nodered', function () {
  return gulpSSH
    .exec(['systemctl restart nodered.service'], {filePath: 'commands.log'})
    .pipe(gulp.dest('logs'));
})

gulp.task('default', gulp.series('uninstall-module', 'remove-module', 'deploy-module', 'install-module', 'restart-nodered'), function() {});
