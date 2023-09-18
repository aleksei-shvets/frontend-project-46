// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

export default (file, fileType) => {
  if (fileType === 'yml' || fileType === 'yaml') {
    return yaml.load(file);
  }
  if (fileType === 'json') {
    return JSON.parse(file);
  }
  throw new Error(`${fileType} - extention not supported`);
};
