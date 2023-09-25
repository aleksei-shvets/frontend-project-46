import yaml from 'js-yaml';

export default (file, fileType) => {
  const parsers = {
    yml: () => yaml.load(file),
    yaml: () => yaml.load(file),
    json: () => JSON.parse(file),
  };

  if (parsers[fileType]) {
    return parsers[fileType]();
  }
  throw new Error(`${fileType} - extention not supported`);
};
