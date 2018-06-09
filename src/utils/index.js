const { ifElse, pipe } = require('./functional');
const { pluralize } = require('./linguistic');
const { getTimestamp } = require('./time');
const {
  constructPath,
  doesFileExist,
  isDirectoryEmpty,
  getDirectoryFilesCount,
  getFileCreationTime,
  getHomeDirectory,
  getDesktopDirectory,
  getBackupsDirectory,
  getBackupPath,
  getBackupCreationTime,
  getLastBackupId,
} = require('./file-system');

module.exports = {
  ifElse,
  pipe,
  pluralize,
  getTimestamp,
  constructPath,
  doesFileExist,
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
