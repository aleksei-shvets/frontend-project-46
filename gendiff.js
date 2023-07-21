#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h', '--help');

program.command('gendiff')
  .option('-V', '--version', 'output the version number')
  .option('-h', '--help', 'output usage information');

program.parse();
