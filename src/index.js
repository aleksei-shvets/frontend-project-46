import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import makeDiffTree from './makeDiffTree.js';
import fileParse from './parsers.js';
import formatter from './formatters/index.js';

const readFile = (file) => readFileSync(path.resolve(cwd(), file), 'utf-8');

const genDiff = (file1, file2, format = 'stylish') => {
  const extension1 = path.extname(file1);
  const extension2 = path.extname(file2);
  const fileContent1 = fileParse(readFile(file1), extension1);
  const fileContent2 = fileParse(readFile(file2), extension2);
  const tree = makeDiffTree(fileContent1, fileContent2);
  return formatter(tree, format);
};
export default genDiff;
