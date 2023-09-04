/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'node:fs';
import genDiffTree from '../src/genDiffTree.js';
import formater from '../src/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf8');

test('gendiff output JSON', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const tree = genDiffTree(filePath1, filePath2);
  expect(formater(tree)).toEqual(readFile('correctOut.txt'));
});

test('gendiff output yaml/yml', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');
  const tree = genDiffTree(filePath1, filePath2);
  expect(formater(tree)).toEqual(readFile('correctOut.txt'));
});
