#!/usr/bin/env node

import { Command } from 'commander';
import genDiffTree from '../src/genDiffTree.js';
import formater from '../src/stylish.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .action((filePath1, filePath2) => {
    const tree = genDiffTree(filePath1, filePath2);
    console.log(formater(tree));
  });

program.parse(process.argv);
