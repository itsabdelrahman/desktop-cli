#!/usr/bin/env node

const shell = require('shelljs');
const prompts = require('prompts');
const program = require('commander');
const { description, version } = require('../package.json');
const {
  pluralize,
  getTimestamp,
  constructPath,
  doesFileExist,
  isDirectoryEmpty,
  getDirectoryFilesCount,
  getDesktopDirectory,
  getBackupPath,
  getLastBackupId,
} = require('./utils');

program
  .version(version)
  .description(description)
  .usage('<command> [args]');

program
  .command('clean')
  .description('Remove all Desktop files')
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
      const desktopFilesWording = pluralize(desktopFilesCount, 'file');

      shell.rm('-rf', constructPath(desktopDirectory, '*'));
      shell.echo(`${desktopFilesCount} Desktop ${desktopFilesWording} removed`);
    }
  });

program
  .command('backup [id]')
  .description('Create Desktop backup')
  .action(id => {
    const backupId = id ? id : getTimestamp();
    const desktopDirectory = getDesktopDirectory();
    const backupDirectory = getBackupPath(backupId);

    if (isDirectoryEmpty(desktopDirectory)) {
      shell.echo('Cannot backup empty Desktop');
      shell.exit(1);
    }

    const desktopFilesCount = getDirectoryFilesCount(desktopDirectory);
    const desktopFilesWording = pluralize(desktopFilesCount, 'file');

    shell.mkdir('-p', backupDirectory);
    shell.mv(constructPath(desktopDirectory, '*'), backupDirectory);
    shell.echo(
      `Stored ${desktopFilesCount} ${desktopFilesWording} in backup: ${backupId}`,
    );
  });

program
  .command('restore [id]')
  .description('Restore Desktop backup')
  .action(id => {
    const backupId = id ? id : getLastBackupId();
    const desktopDirectory = getDesktopDirectory();
    const backupDirectory = getBackupPath(backupId);

    if (!isDirectoryEmpty(desktopDirectory)) {
      shell.echo('Cannot overwrite non-empty Desktop');
      shell.exit(1);
    }

    if (!doesFileExist(backupDirectory)) {
      shell.echo(`Cannot find backup: ${backupId}`);
      shell.exit(1);
    }

    if (isDirectoryEmpty(backupDirectory)) {
      shell.echo('Cannot restore empty backup');
      shell.exit(1);
    }

    const backupFilesCount = getDirectoryFilesCount(backupDirectory);
    const backupFilesWording = pluralize(backupFilesCount, 'file');

    shell.mv(constructPath(backupDirectory, '*'), desktopDirectory);
    shell.echo(
      `Restored ${backupFilesCount} ${backupFilesWording} from backup: ${backupId}`,
    );
  });

program.parse(process.argv);

if (process.argv.length < 3) {
  program.outputHelp();
}
