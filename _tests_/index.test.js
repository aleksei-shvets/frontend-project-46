/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import makeDiffTree from '../src/makeDiffTree.js';
import genDiff from '../src/formaters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf8');

test('stylish format output for .json', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const tree = makeDiffTree(filePath1, filePath2);
  expect(genDiff(tree, 'stylish')).toEqual(readFile('correctStylish.txt'));
});

test('stylish format output for .yaml/.yml', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');
  const tree = makeDiffTree(filePath1, filePath2);
  expect(genDiff(tree, 'stylish')).toEqual(readFile('correctStylish.txt'));
});

test('plain format output for .json', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const tree = makeDiffTree(filePath1, filePath2);
  expect(genDiff(tree, 'plain')).toEqual(readFile('correctPlain.txt'));
});

test('plain format output for .yaml/.yml', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');
  const tree = makeDiffTree(filePath1, filePath2);
  expect(genDiff(tree, 'plain')).toEqual(readFile('correctPlain.txt'));
});

test('JSON format output for .json', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const tree = makeDiffTree(filePath1, filePath2);
  expect(genDiff(tree, 'json')).toEqual(readFile('correctJsonFormat.txt'));
});

test('JSON format output for .yaml/.yml', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');
  const tree = makeDiffTree(filePath1, filePath2);
  expect(genDiff(tree, 'json')).toEqual(readFile('correctJsonFormat.txt'));
});
