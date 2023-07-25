#!/usr/bin/env node

import { Command } from 'commander';
// eslint-disable-next-line no-unused-vars, import/no-extraneous-dependencies
import _ from 'lodash';

//import path from 'path';

/* const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>');

program.parse(process.argv);

const { args } = program;
const options = program.opts();
const { filePath1, filePath2 } = options; */

const $file1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
const $file2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const result = {};

const fileComparison = (file1, file2) => {
  _.forIn(file1, (value, key) => {
    const newMinusKey = `- ${key}`;
    const newPlusKey = `+ ${key}`;
    if (!Object.hasOwn(file2, key)) {
      result[newMinusKey] = value;
    }

    if (Object.hasOwn(file2, key) && value === file2[key]) {
      result[key] = value;
    }

    if (Object.hasOwn(file2, key) && value !== file2[key]) {
      result[newMinusKey] = file1[key];
      result[newPlusKey] = file2[key];
    }
  });

  _.forIn(file2, (value, key) => {
    const newPlusKey = `+ ${key}`;
    if (!Object.hasOwn(file1, key)) {
      result[newPlusKey] = value;
    }
  });
  return result;
};

console.log(fileComparison($file1, $file2));
