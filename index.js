#! /usr/bin/env node
'use strict';

const os = require('os');
const shell = require('shelljs');
const prompts = require('prompts');
const program = require('commander');
const { name, description, version } = require('./package.json');

const getTimestamp = () => Math.round(new Date() / 1000);
const getHomeDirectory = () => os.homedir();
const getDesktopDirectory = () => [getHomeDirectory(), 'Desktop'].join('/');
const getRepositoryPath = () => [getHomeDirectory(), name].join('/');
const isDirectoryEmpty = path => shell.ls(path).length === 0;
const constructStashDirectory = () =>
  [getRepositoryPath(), getTimestamp()].join('/');

program
  .version(version)
  .description(description)
  .usage('<command> [args]');

program
  .command('clear')
  .description('')
  .action(async () => {
    const desktopDirectory = getDesktopDirectory();

    if (isDirectoryEmpty(desktopDirectory)) {
      shell.echo('Cannot clear empty desktop');
      shell.exit(1);
    }

    const response = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Are you sure you want to delete all desktop contents?',
      initial: false,
    });

    if (response.value) {
      shell.rm('-rf', [desktopDirectory, '*'].join('/'));
      shell.echo('Cleared desktop contents');
    }
  });

program
  .command('stash')
  .description('')
  .action(() => {
    const desktopDirectory = getDesktopDirectory();
    const stashDirectory = constructStashDirectory();

    if (isDirectoryEmpty(desktopDirectory)) {
      shell.echo('Cannot stash empty desktop');
      shell.exit(1);
    }

    shell.mkdir('-p', stashDirectory);
    shell.mv([desktopDirectory, '*'].join('/'), stashDirectory);
    shell.echo('Saved desktop contents in ' + stashDirectory);
  });

program.parse(process.argv);
