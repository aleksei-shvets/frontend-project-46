import stylish from './stylish.js';
import plain from './plain.js';

export default (tree, formatName) => {
  const formaters = {
    stylish: () => stylish(tree),
    plain: () => plain(tree),
    json: () => JSON.stringify(tree),
  };

  if (formaters[formatName]) {
    return formaters[formatName]();
  }
  throw new Error(`${formatName} - Unsupported format`);
};
