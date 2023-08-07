import _ from 'lodash';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import fileParse from './fileParse.js';

export default (file1, file2) => {
  const result = {};

  const readFile = (file) => readFileSync(path.resolve(file), 'utf-8');

  const extension1 = path.extname(file1);
  const extension2 = path.extname(file2);
  const fileContent1 = fileParse(readFile(file1), extension1);
  const fileContent2 = fileParse(readFile(file2), extension2);

  _.forIn(fileContent1, (value, key) => {
    const newMinusKey = `- ${key}`;
    const newPlusKey = `+ ${key}`;
    if (!Object.hasOwn(fileContent2, key)) {
      result[newMinusKey] = value;
    }

    if (Object.hasOwn(fileContent2, key) && value === fileContent2[key]) {
      result[key] = value;
    }

    if (Object.hasOwn(fileContent2, key) && value !== fileContent2[key]) {
      result[newMinusKey] = fileContent1[key];
      result[newPlusKey] = fileContent2[key];
    }
  });

  _.forIn(fileContent2, (value, key) => {
    const newPlusKey = `+ ${key}`;
    if (!Object.hasOwn(fileContent1, key)) {
      result[newPlusKey] = value;
    }
  });
  return JSON.stringify(result, ' ', 2);
};
