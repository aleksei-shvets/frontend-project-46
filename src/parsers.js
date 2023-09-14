// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

export default (file, extention) => {
  if (extention === '.yml' || extention === '.yaml') {
    return yaml.load(file);
  }
  if (extention === '.json') {
    return JSON.parse(file);
  }
  throw new Error(`${extention} - extention not supported`);
};
