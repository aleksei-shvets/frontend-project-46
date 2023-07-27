#!/usr/bin/env node

import { Command } from 'commander';
import _ from 'lodash';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const fileComparison = (file1, file2) => {
  const result = {};
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
  return JSON.stringify(result, ' ', 2);
};

let $file1;
let $file2;

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .action((filePath1, filePath2) => {
    const fullPath1 = path.resolve(filePath1);
    const fullPath2 = path.resolve(filePath2);
    if (existsSync(fullPath1)) {
      $file1 = JSON.parse(readFileSync(fullPath1));
    } else {
      throw new Error('File-1 not found');
    }
    if (existsSync(filePath2)) {
      $file2 = JSON.parse(readFileSync(fullPath2));
    } else {
      throw new Error('File-2 not found');
    }
  });

program.parse(process.argv);

console.log(fileComparison($file1, $file2));
