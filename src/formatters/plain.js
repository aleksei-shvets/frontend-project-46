const valueStringify = (item) => {
  if (item instanceof Object) return '[complex value]';
  if (typeof item === 'string') return `'${item}'`;
  return item;
};

const getFullPath = (path, key) => (path ? `${path}.${key}` : key);

export default (tree) => {
  const iter = (treeArray, currentPath = '') => {
    const result = Array.isArray(treeArray) ? treeArray.map((object) => {
      switch (object.type) {
        case 'changed':
          return `Property '${getFullPath(currentPath, object.key)}' was updated. From ${valueStringify(object.value1)} to ${valueStringify(object.value2)}`;
        case 'added':
          return `Property '${getFullPath(currentPath, object.key)}' was added with value: ${valueStringify(object.value)}`;
        case 'deleted':
          return `Property '${getFullPath(currentPath, object.key)}' was removed`;
        case 'nested':
          return iter(object.children, getFullPath(currentPath, object.key));
        case 'notchanged':
          return null;
        default:
          throw new Error(`Unknown node in tree ${tree}`);
      }
    }).filter(Boolean).join('\n') : undefined;
    return result;
  };
  return iter(tree);
};
