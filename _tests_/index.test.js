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
    expect(genDiff(pathJson1, pathJson2)).toEqual(readFile('correctStylish.txt'));
    expect(genDiff(pathYaml1, pathYaml2, 'stylish')).toEqual(readFile('correctStylish.txt'));
  });
});

describe('plain format', () => {
  test('plain format output', () => {
    expect(genDiff(pathJson1, pathJson2, 'plain')).toEqual(readFile('correctPlain.txt'));
    expect(genDiff(pathYaml1, pathYaml2, 'plain')).toEqual(readFile('correctPlain.txt'));
  });
});

describe('JSON format', () => {
  test('JSON format output', () => {
    expect(genDiff(pathJson1, pathJson2, 'json')).toEqual(readFile('correctJsonFormat.txt'));
    expect(genDiff(pathYaml1, pathYaml2, 'json')).toEqual(readFile('correctJsonFormat.txt'));
  });
});
