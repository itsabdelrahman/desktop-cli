#! /usr/bin/env node
'use strict';

const os = require('os');
const shell = require('shelljs');
const program = require('commander');
const { name, description, version } = require('./package.json');

const getTimestamp = () => Math.round(new Date() / 1000);
const getHomeDirectory = () => os.homedir();
const getDesktopDirectory = () => [getHomeDirectory(), 'Desktop'].join('/');
const getRepositoryPath = () => [getHomeDirectory(), name].join('/');
const constructStashDirectory = () =>
  [getRepositoryPath(), getTimestamp()].join('/');

program
  .version(version)
  .description(description)
  .usage('<command> [args]');

program
  .command('stash')
  .description('')
  .action(() => {
    const desktopDirectory = getDesktopDirectory();
    const stashDirectory = constructStashDirectory();

    shell.mkdir('-p', stashDirectory);
    shell.mv([desktopDirectory, '*'].join('/'), stashDirectory);
  });

program.parse(process.argv);
