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
const getDirectoryFilesCount = path => shell.ls(path).length;
const isDirectoryEmpty = path => getDirectoryFilesCount(path) === 0;
const constructStashDirectory = () =>
  [getRepositoryPath(), getTimestamp()].join('/');
const ifElse = (ifCondition, thenValue, elseValue) =>
  ifCondition ? thenValue : elseValue;

program
  .version(version)
  .description(description)
  .usage('<command> [args]');

program
  .command('clean')
  .description('Remove all files from Desktop')
  .action(async () => {
    const desktopDirectory = getDesktopDirectory();

    if (isDirectoryEmpty(desktopDirectory)) {
      shell.echo('Cannot clean empty Desktop');
      shell.exit(1);
    }

    const response = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Are you sure you want to remove all Desktop files?',
      initial: true,
    });

    if (response.value) {
      const desktopFilesCount = getDirectoryFilesCount(desktopDirectory);

      shell.rm('-rf', [desktopDirectory, '*'].join('/'));
      shell.echo(
        desktopFilesCount +
          ' Desktop file' +
          ifElse(desktopFilesCount === 1, '', 's') +
          ' removed',
      );
    }
  });

program
  .command('stash')
  .description('')
  .action(() => {
    const desktopDirectory = getDesktopDirectory();
    const stashDirectory = constructStashDirectory();

    if (isDirectoryEmpty(desktopDirectory)) {
      shell.echo('Cannot stash empty Desktop');
      shell.exit(1);
    }

    shell.mkdir('-p', stashDirectory);
    shell.mv([desktopDirectory, '*'].join('/'), stashDirectory);
    shell.echo('Saved Desktop contents in ' + stashDirectory);
  });

program.parse(process.argv);

if (process.argv.length < 3) {
  program.outputHelp();
}
