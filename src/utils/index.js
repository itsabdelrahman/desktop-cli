const { ifElse } = require('./functional');
const { pluralize } = require('./linguistic');
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
  pluralize,
  getTimestamp,
  constructPath,
  isDirectoryEmpty,
  getDirectoryFilesCount,
  getHomeDirectory,
  getDesktopDirectory,
  getBackupsDirectory,
  getBackupDirectory,
};
