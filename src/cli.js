#!/usr/bin/env node

const shell = require('shelljs');
const prompts = require('prompts');
const program = require('commander');
const { description, version } = require('../package.json');
const {
  ifElse,
  isDirectoryEmpty,
  getDirectoryFilesCount,
  getDesktopDirectory,
  getBackupDirectory,
} = require('./utils');

// TODO: Account for all file system errors (e.g. permission denial)
// TODO: Investigate feasibility of avoiding using moving files (& linking instead)
// TODO: Decide on indexing strategy (e.g. UNIX timestamps, incremental integers)

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

      // TODO: Refactor pluralization
      shell.echo(
        desktopFilesCount +
          ' Desktop file' +
          ifElse(desktopFilesCount === 1, '', 's') +
          ' removed',
      );
    }
  });

// TODO: Add backup naming functionality

program
  .command('backup')
  .description('Backup Desktop files')
  .action(() => {
    const desktopDirectory = getDesktopDirectory();
    const backupDirectory = getBackupDirectory();

    if (isDirectoryEmpty(desktopDirectory)) {
      shell.echo('Cannot backup empty Desktop');
      shell.exit(1);
    }

    shell.mkdir('-p', backupDirectory);
    shell.mv([desktopDirectory, '*'].join('/'), backupDirectory);
    shell.echo('Stored Desktop backup in ' + backupDirectory);
  });

// TODO: Add restore last functionality
// TODO: Add backup listing functionality

program
  .command('restore <backupId>')
  .description('Restore Desktop backup')
  .action(backupId => {
    const desktopDirectory = getDesktopDirectory();
    const backupDirectory = getBackupDirectory(backupId);

    if (!isDirectoryEmpty(desktopDirectory)) {
      shell.echo('Cannot overwrite non-empty Desktop');
      shell.exit(1);
    }

    // TODO: Check if backup exists

    const backupFilesCount = getDirectoryFilesCount(backupDirectory);
    shell.mv([backupDirectory, '*'].join('/'), desktopDirectory);

    // TODO: Refactor pluralization
    shell.echo(
      'Restored ' +
        backupFilesCount +
        ' file' +
        ifElse(backupFilesCount === 1, '', 's') +
        ' from backup',
    );
  });

// TODO: Add quick note-taking functionality

program.parse(process.argv);

if (process.argv.length < 3) {
  program.outputHelp();
}
