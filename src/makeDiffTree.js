import _ from 'lodash';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import fileParse from './parsers.js';

const readFile = (file) => readFileSync(path.resolve(cwd(), file), 'utf-8');

export default (file1, file2) => {
  const extension1 = path.extname(file1);
  const extension2 = path.extname(file2);
  const fileContent1 = fileParse(readFile(file1), extension1);
  const fileContent2 = fileParse(readFile(file2), extension2);

  const compareFiles = (content1, content2) => {
    const keys = Object.keys({ ...content1, ...content2 });
    const tree = _.sortBy(keys, (key) => key)
      .map((key) => {
        if (_.isPlainObject(content1[key]) && _.isPlainObject(content2[key])) {
          return {
            type: 'node', key: `${key}`, value: compareFiles(content1[key], content2[key]),
          };
        }
        if (_.has(content1, key) && !_.has(content2, key)) {
          return {
            type: 'deleted', key: `${key}`, value: content1[key],
          };
        }
        if (!_.has(content1, key) && _.has(content2, key)) {
          return {
            type: 'added', key: `${key}`, value: content2[key],
          };
        }
        if (content1[key] === content2[key]) {
          return {
            type: 'notchanged', key: `${key}`, value: content1[key],
          };
        }
        return {
          type: 'changed', key: `${key}`, value1: content1[key], value2: content2[key],
        };
      });
    return tree;
  };
  return compareFiles(fileContent1, fileContent2);
};
