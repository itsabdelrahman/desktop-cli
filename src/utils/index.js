const { ifElse } = require('./functional');
const { getTimestamp } = require('./time');
const {
  constructPath,
  isDirectoryEmpty,
  getDirectoryFilesCount,
  getHomeDirectory,
  getDesktopDirectory,
  getBackupsDirectory,
  getBackupDirectory,
} = require('./file-system');

module.exports = {
  ifElse,
  getTimestamp,
  constructPath,
  isDirectoryEmpty,
  getDirectoryFilesCount,
  getHomeDirectory,
  getDesktopDirectory,
  getBackupsDirectory,
  getBackupDirectory,
};
