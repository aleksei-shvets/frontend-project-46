const valueStringify = (item) => {
  if (item instanceof Object) {
    return '[complex value]';
  }
  if (typeof item === 'string') {
    return `'${item}'`;
  }
  return item;
};

const getFullPath = (path, key) => (path ? `${path}.${key}` : key);

export default (tree) => {
  const iter = (treeArray, currentPath = '') => {
    const result = Array.isArray(treeArray) ? treeArray.map((object) => {
      if (object.type !== 'node') {
        if (object.type === 'changed') {
          return `Property '${getFullPath(currentPath, object.key)}' was updated. From ${valueStringify(object.value1)} to ${valueStringify(object.value2)}`;
        }
        if (object.type === 'added') {
          return `Property '${getFullPath(currentPath, object.key)}' was added with value: ${valueStringify(object.value)}`;
        }
        if (object.type === 'deleted') {
          return `Property '${getFullPath(currentPath, object.key)}' was removed`;
        }
      }
      const currentLevelPath = getFullPath(currentPath, object.key);
      return iter(object.value, currentLevelPath);
    }).filter(Boolean).join('\n') : undefined;
    return result;
  };
  return iter(tree);
};
