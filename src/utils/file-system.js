const os = require('os');
const shell = require('shelljs');

const constructPath = (...pathComponents) => pathComponents.join('/');

const isDirectoryEmpty = path => getDirectoryFilesCount(path) === 0;

const getDirectoryFilesCount = path => shell.ls(path).length;

const getHomeDirectory = () => os.homedir();

const getDesktopDirectory = () => constructPath(getHomeDirectory(), 'Desktop');

const getBackupsDirectory = () =>
  constructPath(getHomeDirectory(), 'Desktop-CLI', 'backups');

const getBackupDirectory = backupId =>
  constructPath(getBackupsDirectory(), backupId);

module.exports = {
  constructPath,
  isDirectoryEmpty,
  getDirectoryFilesCount,
  getHomeDirectory,
  getDesktopDirectory,
  getBackupsDirectory,
  getBackupDirectory,
};
