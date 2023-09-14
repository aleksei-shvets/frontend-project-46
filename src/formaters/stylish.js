import _ from 'lodash';

const genIndent = (level = 1) => (' ').repeat(level);

const stringify = (object, level = 0) => {
  const iter = (element, depth = 1, spaceCount = 4) => {
    const indent = genIndent(spaceCount * (depth + level));
    const closingIndent = genIndent(spaceCount * (depth + level - 1));
    if (!_.isObject(element)) return element;

    const entries = Object.entries(element);
    if (entries.length === 0) return '{}';

    const string = entries.map(([key, value]) => (
      (!_.isObject(value)) ? `${key}: ${value}` : `${key}: ${iter(value, depth + 1)}`))
      .join(`\n${indent}`);

    return `{\n${indent}${string}\n${closingIndent}}`;
  };
  return iter(object);
};

export default (tree) => {
  const iter = (treeArray, level = 1, spaceCount = 4) => {
    const standardIndent = genIndent(spaceCount * level);
    const offsetIndent = genIndent(spaceCount * level - 2);
    const closingIndent = genIndent(spaceCount * (level - 1));
    const result = treeArray.map((object) => {
      if (object.type !== 'node') {
        switch (object.type) {
          case 'notchanged':
            return `${standardIndent}${object.key}: ${stringify(object.value, level)}`;
          case 'changed':
            return `${offsetIndent}- ${object.key}: ${stringify(object.value1, level)}\n${offsetIndent}+ ${object.key}: ${stringify(object.value2)}`;
          case 'added':
            return `${offsetIndent}+ ${object.key}: ${stringify(object.value, level)}`;
          case 'deleted':
            return `${offsetIndent}- ${object.key}: ${stringify(object.value, level)}`;
          default:
            throw new Error(`Unknown node in tree ${tree}`);
        }
      }
      return `${standardIndent}${object.key}: ${iter(object.value, level + 1)}`;
    }).join('\n');
    return `{\n${result}\n${closingIndent}}`;
  };
  return iter(tree);
};
