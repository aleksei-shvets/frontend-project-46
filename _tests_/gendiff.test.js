import { readFileSync } from 'fs';
import fileComparison from '../bin/gendiff.js';

const path = require('path');

const getFullPath = (filename) => path.resolve(__dirname, '__fixtures__', filename);

const output = {
  host: 'hexlet.io',
  '- timeout': 50,
  '+ timeout': 20,
  '- proxy': '123.234.53.22',
  '- follow': false,
  '+ verbose': true,
};

test('gendiff output', () => {
  const filePath1 = getFullPath('file1.json');
  const filePath2 = getFullPath('file2.json');
  expect(() => {
    fileComparison(filePath1, filePath2);
  }).toEqual(output);
});
