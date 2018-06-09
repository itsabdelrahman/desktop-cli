#! /usr/bin/env node
'use strict';

const program = require('commander');
const { description, version } = require('./package.json');

program
  .version(version)
  .description(description)
  .usage('<command> [args]');

program.parse(process.argv);
