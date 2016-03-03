/**
 * Created by Yangwook Ryoo on 1/28/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import webpack from 'webpack';
import del from 'del';
import path from 'path';
import {exec} from 'child_process';
import * as config from './tools/config.js';

const isparta = require('isparta');

/* clean dist/public directory before start */
gulp.task('clean', () => {
  return del(['dist/public/*', '!dist/public/*.js', '**/*.map']);
});

/* copy static files and server.js */
gulp.task('copy', ['clean'], () => {
  return gulp.src([
    'src/public/*',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/foundation-sites/dist/foundation.min.js',
    'node_modules/foundation-sites/js/foundation.util.mediaQuery.js'
    ])//remove if not necessory
    .pipe(gulp.dest('dist/public/'));
});


//showing error or done
function onBuild(done) {
  return (err, stats) => {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString({chunks:false}));
    }
    if(done) {
      done();
    }
  }
}

/* build app with sourcemap */
gulp.task('buildApp', done => {
  webpack(Object.assign(
    {devtool: "source-map"},
    config.webpackAppConfig))
  .run(onBuild(done)
  );
});
//TODO minify CSS and img

/* build app without sourcemap */
gulp.task('buildApp:production', done => {
  webpack(config.webpackAppConfig)
  .run(onBuild(done));
});
//TODO minify CSS and img

/* build server with sourcemap */
gulp.task('buildServer', done => {
  webpack(config.webpackServerConfig)
  .run(onBuild(done));
});

gulp.task('watchApp', () => {
  webpack(Object.assign(
    {devtool: "source-map"},
    config.webpackAppConfig))
  .watch(100, onBuild());
});

gulp.task('watchServer', () => {
  webpack(config.webpackServerConfig)
  .watch(100, onBuild());
});

/* watch change of source except client js/jsx files */
gulp.task('watch', ['watchServer', 'watchApp'], () => {
  gulp.watch(['src/public/*'], ['copy']);       //public file change -> rerun copy
});

/* remove all unit test report files */
gulp.task('clean-coverage', cb => {
  return del('dist/coverage', cb);
});

/* prepare unit test */
gulp.task('istanbul', ['clean-coverage'], cb => {
  gulp.src(['./tools/test/Rectangle.js'])
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true,
      babel: {
        presets: ["es2015"]
      }
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', cb);
});

/* unit test and generate report to dist/coverage */
gulp.task('test', ['istanbul'], () => {
  return gulp.src('tools/test/test.js')
    .pipe(mocha({
      reporter: 'spec'
    }))
    .pipe(istanbul.writeReports({
      dir: 'dist/coverage',
      reportOpts: {dir: 'dist/coverage'},
      reporters: ['text', 'text-summary', 'html']
    })); //report is in dist/coverage
  //TODO make unit test for every case.
});

/* initiate DB */
gulp.task('initdb',(cb) => {
  exec('node_modules/.bin/babel-node tools/initiateDB.js',(err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

/* lint js/jsx files */
gulp.task('lint', () => {
  return gulp.src(['src/**/*.jsx'],['src/**/*.js'])
    .pipe(eslint(config.lintConfig))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  //TODO need to customize rules and scope
});

/* bundle/build for production */
gulp.task('startProduction', ['buildApp:production', 'buildServer', 'copy'], () => {
  return console.log("build for production done");
});

/* bundle/build for deploy */
gulp.task('start',['buildApp', 'buildServer', 'copy'], () => {
  return console.log("build done");
});

/* run application in localhost by default */
gulp.task('default',['watch', 'copy'], () => {
  nodemon({
    script: 'dist/server.js',
    ext: 'js html',
    watch: 'dist/*',
    env: {
      'NODE_ENV': 'development',
      'NODE_PATH': path.join(__dirname+'/dist')
      }
  });   //run nodemon to start server
});
