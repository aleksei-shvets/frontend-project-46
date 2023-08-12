// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

export default (file, extention) => {
  let fileContent;
  if (extention === '.yml' || extention === '.yaml') {
    fileContent = yaml.load(file);
  } else if (extention === '.json') {
    fileContent = JSON.parse(file);
  } else {
    throw new Error(`${extention} - extention not supported`);
  }
  return fileContent;
};
