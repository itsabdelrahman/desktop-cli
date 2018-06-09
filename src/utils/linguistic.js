const pluralize = (count, word) => (count === 1 ? word : word.concat('s'));

module.exports = {
  pluralize
};
