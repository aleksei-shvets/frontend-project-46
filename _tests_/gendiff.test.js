import fileComparison from '../src/fileComparison.js';

const output = {
  host: 'hexlet.io',
  '- timeout': 50,
  '+ timeout': 20,
  '- proxy': '123.234.53.22',
  '- follow': false,
  '+ verbose': true,
};
const equal = JSON.stringify(output, ' ', 2);

test('gendiff output', () => {
  const filePath1 = './__fixtures__/file1.json';
  const filePath2 = './__fixtures__/file2.json';
  expect(fileComparison(filePath1, filePath2)).toEqual(equal);
});
