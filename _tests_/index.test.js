/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf8');

const pathJson1 = getFixturePath('file1.json');
const pathJson2 = getFixturePath('file2.json');
const pathYaml1 = getFixturePath('file1.yaml');
const pathYaml2 = getFixturePath('file2.yaml');

describe('stylish format', () => {
  test('stylish format output', () => {
    const expectedValue = readFile('correctStylish.txt');
    expect(genDiff(pathJson1, pathJson2)).toEqual(expectedValue);
    expect(genDiff(pathYaml1, pathYaml2, 'stylish')).toEqual(expectedValue);
  });
});

describe('plain format', () => {
  test('plain format output', () => {
    const expectedValue = readFile('correctPlain.txt');
    expect(genDiff(pathJson1, pathJson2, 'plain')).toEqual(expectedValue);
    expect(genDiff(pathYaml1, pathYaml2, 'plain')).toEqual(expectedValue);
  });
});

describe('JSON format', () => {
  test('JSON format output', () => {
    const expectedValue = readFile('correctJsonFormat.txt');
    expect(genDiff(pathJson1, pathJson2, 'json')).toEqual(expectedValue);
    expect(genDiff(pathYaml1, pathYaml2, 'json')).toEqual(expectedValue);
  });
});
