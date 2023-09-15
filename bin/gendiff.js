#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';
import makeDiffTree from '../src/makeDiffTree.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filePath1, filePath2) => {
    const tree = makeDiffTree(filePath1, filePath2);
    console.log(genDiff(tree, program.opts().format));
  });

program.parse(process.argv);
