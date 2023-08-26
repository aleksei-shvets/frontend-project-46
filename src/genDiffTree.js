/* eslint-disable comma-dangle */
import _ from 'lodash';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import fileParse from './parsers.js';

const readFile = (file) => readFileSync(path.resolve(cwd(), file), 'utf8');

const isObjectAndNotArray = (obj) => (_.isObject(obj) && !Array.isArray(obj));

export default (file1, file2) => {
  const extension1 = path.extname(file1);
  const extension2 = path.extname(file2);
  const content1 = fileParse(readFile(file1), extension1);
  const content2 = fileParse(readFile(file2), extension2);

  const compareFiles = (fileContent1, fileContent2) => {
    const keys = Object.keys({ ...fileContent1, ...fileContent2 });
    const tree = _.sortBy(keys, (key) => key)
      .map((key) => {
        if (isObjectAndNotArray(fileContent1[key]) && isObjectAndNotArray(fileContent2[key])) {
          return { type: 'node', key: `${key}`, value: compareFiles(fileContent1[key], fileContent2[key]) };
        }
        if (fileContent1[key] === fileContent2[key]) {
          return { type: 'notchanged', key: `${key}`, value: fileContent1[key], };
        }
        return {
          type: 'changed', key: `${key}`, value1: fileContent1[key], value2: fileContent2[key],
        };
      });
    return tree;
  };
  return compareFiles(content1, content2);
};
