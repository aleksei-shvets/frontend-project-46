const valueStringify = (item) => {
  if (item instanceof Object) {
    return '[complex value]';
  }
  if (typeof item === 'string') {
    return `'${item}'`;
  }
  return item;
};

const getFullKey = (path, key) => (path ? `${path}.${key}` : key);

export default (tree) => {
  const iter = (treeArray, preName = '') => {
    const result = Array.isArray(treeArray) ? treeArray.map((object) => {
      if (object.type !== 'node') {
        if (object.type === 'changed') {
          return `Property '${getFullKey(preName, object.key)}' was updated. From ${valueStringify(object.value1)} to ${valueStringify(object.value2)}`;
        }
        if (object.type === 'added') {
          return `Property '${getFullKey(preName, object.key)}' was added with value: ${valueStringify(object.value)}`;
        }
        if (object.type === 'deleted') {
          return `Property '${getFullKey(preName, object.key)}' was removed`;
        }
      }
      return iter(object.value, object.key);
    }).join('\n') : undefined;
    return result;
  };
  return iter(tree);
};
