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
const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');
const filePath3 = getFixturePath('file1.yaml');
const filePath4 = getFixturePath('file2.yaml');
const treeFromJson = makeDiffTree(filePath1, filePath2);
const treeFromYaml = makeDiffTree(filePath3, filePath4);

describe('stylish format', () => {
  test('stylish format output', () => {
    expect(genDiff(treeFromJson, 'stylish')).toEqual(readFile('correctStylish.txt'));
    expect(genDiff(treeFromYaml, 'stylish')).toEqual(readFile('correctStylish.txt'));
  });
});

describe('plain format', () => {
  test('plain format output', () => {
    expect(genDiff(treeFromJson, 'plain')).toEqual(readFile('correctPlain.txt'));
    expect(genDiff(treeFromYaml, 'plain')).toEqual(readFile('correctPlain.txt'));
  });
});

describe('JSON format', () => {
  test('JSON format output', () => {
    expect(genDiff(treeFromJson, 'json')).toEqual(readFile('correctJsonFormat.txt'));
    expect(genDiff(treeFromYaml, 'json')).toEqual(readFile('correctJsonFormat.txt'));
  });
});
