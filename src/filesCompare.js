import _ from 'lodash';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import fileParse from './fileParse.js';

const readFile = (file) => readFileSync(path.resolve(file), 'utf8');

export default (file1, file2) => {
  const extension1 = path.extname(file1);
  const extension2 = path.extname(file2);
  const fileContent1 = fileParse(readFile(file1), extension1);
  const fileContent2 = fileParse(readFile(file2), extension2);
  const keys = Object.keys({ ...fileContent1, ...fileContent2 });

  const result = _.sortBy(keys, (key) => key)
    .map((key) => {
      if (Object.hasOwn(fileContent1, key) && Object.hasOwn(fileContent2, key)) {
        if (fileContent1[key] === fileContent2[key]) {
          return `  ${key}: ${fileContent1[key]}`;
        }
        if (fileContent1[key] !== fileContent2[key]) {
          return `  - ${key}: ${fileContent1[key]}\n  + ${key}:${fileContent2[key]}`;
        }
      }
      if (Object.hasOwn(fileContent1, key) && !Object.hasOwn(fileContent2, key)) {
        return `  - ${key}: ${fileContent1[key]}`;
      }
      return `  + ${key}: ${fileContent2[key]}`;
    }).join('\n');
  return `{\n${result}\n}`;
};
