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

const stylishResult = readFile('correctStylish.txt');
const plainResult = readFile('correctPlain.txt');
const jsonResult = readFile('correctJsonFormat.txt');

test.each([
  ['stylish', pathJson1, pathJson2, stylishResult],
  ['stylish', pathYaml1, pathYaml2, stylishResult],
  ['plain', pathJson1, pathJson2, plainResult],
  ['plain', pathYaml1, pathYaml2, plainResult],
  ['json', pathJson1, pathJson2, jsonResult],
  ['json', pathYaml1, pathYaml2, jsonResult],
])('gendiff %s', (format, path1, path2, expected) => {
  expect(genDiff(path1, path2, format)).toEqual(expected);
});
