const os = require('os');
const fs = require('fs');
const shell = require('shelljs');
const { pipe } = require('./functional');

const constructPath = (...pathComponents) => pathComponents.join('/');

const isDirectoryEmpty = path => getDirectoryFilesCount(path) === 0;

const getDirectoryFilesCount = path => shell.ls(path).length;

const getFileCreationTime = path => fs.statSync(path).birthtimeMs;

const getHomeDirectory = () => os.homedir();

const getDesktopDirectory = () => constructPath(getHomeDirectory(), 'Desktop');

const getBackupsDirectory = () =>
  constructPath(getHomeDirectory(), 'Desktop-CLI', 'backups');

const getBackupPath = backupId =>
  constructPath(getBackupsDirectory(), backupId);

const getBackupCreationTime = pipe(
  getBackupPath,
  getFileCreationTime,
);

const getLastBackupId = () => {
  const backupsIds = shell.ls(getBackupsDirectory());

  const backups = backupsIds.map(backupId => ({
    id: backupId,
    createdAt: getBackupCreationTime(backupId),
  }));

  const lastBackup = backups.reduce((latestBackupYet, currentBackup) => {
    if (latestBackupYet.createdAt > currentBackup.createdAt) {
      return latestBackupYet;
    }

    return currentBackup;
  });

  return lastBackup.id;
};

module.exports = {
  constructPath,
  isDirectoryEmpty,
  getDirectoryFilesCount,
  getFileCreationTime,
  getHomeDirectory,
  getDesktopDirectory,
  getBackupsDirectory,
  getBackupPath,
  getBackupCreationTime,
  getLastBackupId,
};
