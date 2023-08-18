import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';
import fileParse from './parsers.js';

const readFile = (file) => readFileSync(path.resolve(cwd(), file), 'utf8');

export default (file1, file2) => {
  const extension1 = path.extname(file1);
  const extension2 = path.extname(file2);
  const content1 = fileParse(readFile(file1), extension1);
  const content2 = fileParse(readFile(file2), extension2);

  const compareFiles = (fileContent1, fileContent2, level = 1) => {
    const tab = ' ';
    const keys = Object.keys({ ...fileContent1, ...fileContent2 });
    const result = _.sortBy(keys, (key) => key)
      .map((key) => {
        const value1 = fileContent1[key];
        const value2 = fileContent2[key];
        if (!_.isObject(value1) && !_.isObject(value2)) {
          if (Object.hasOwn(fileContent1, key) && Object.hasOwn(fileContent2, key)) {
            if (value1 === value2) {
              return `${tab.repeat(level)}${key}: ${value1}`;
            }
            if (value1 !== value2) {
              return `${tab.repeat(level)}- ${key}: ${value1}\n${tab.repeat(level)}+ ${key}: ${value2}`;
            }
          }
          if (Object.hasOwn(fileContent1, key) && !Object.hasOwn(fileContent2, key)) {
            return `${tab.repeat(level)}- ${key}: ${value1}`;
          }
          return `${tab.repeat(level)}+ ${key}: ${value2}`;
        }
        const correctValue1 = value1 ?? {};
        const correctValue2 = value2 ?? {};
        return `${tab.repeat(level)}${key}: ${compareFiles(correctValue1, correctValue2, level + 1)}`;
      }).join('\n');
    return `{\n${result}\n${tab.repeat(level - 1)}}`;
  };

  return compareFiles(content1, content2);
};
