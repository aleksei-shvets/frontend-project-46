/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fileComparison from '../src/fileComparison.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => getFixturePath(filename);

const output = {
  host: 'hexlet.io',
  '- timeout': 50,
  '+ timeout': 20,
  '- proxy': '123.234.53.22',
  '- follow': false,
  '+ verbose': true,
};
const equal = JSON.stringify(output, ' ', 2);

test('gendiff output', () => {
  const filePath1 = readFile('file1.json');
  const filePath2 = readFile('file2.json');
  expect(fileComparison(filePath1, filePath2)).toEqual(equal);
});
