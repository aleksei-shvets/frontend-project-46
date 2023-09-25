import _ from 'lodash';

const genIndent = (spaceCount, level, offset = 0) => (' ').repeat(spaceCount * level - offset);

const stringify = (object, level = 0) => {
  const iter = (element, depth = 1, spaceCount = 4) => {
    if (!_.isObject(element)) return element;

    const entries = Object.entries(element);
    if (entries.length === 0) return '{}';

    const string = entries.map(([key, value]) => (
      (!_.isObject(value))
        ? `${key}: ${value}`
        : `${key}: ${iter(value, depth + 1)}`)).join(`\n${genIndent(spaceCount, (depth + level))}`);

    return `{\n${genIndent(spaceCount, (depth + level))}${string}\n${genIndent(spaceCount, (depth + level - 1))}}`;
  };
  return iter(object);
};

export default (tree) => {
  const iter = (treeArray, level = 1, spaceCount = 4) => {
    const result = treeArray.map((object) => {
      switch (object.type) {
        case 'unchanged':
          return `${genIndent(spaceCount, level)}${object.key}: ${stringify(object.value, level)}`;
        case 'changed':
          return `${genIndent(spaceCount, level, 2)}- ${object.key}: ${stringify(object.value1, level)}\n${genIndent(spaceCount, level, 2)}+ ${object.key}: ${stringify(object.value2, level)}`;
        case 'added':
          return `${genIndent(spaceCount, level, 2)}+ ${object.key}: ${stringify(object.value, level)}`;
        case 'deleted':
          return `${genIndent(spaceCount, level, 2)}- ${object.key}: ${stringify(object.value, level)}`;
        case 'nested':
          return `${genIndent(spaceCount, level)}${object.key}: ${iter(object.children, level + 1)}`;
        default:
          throw new Error(`Unknown node in tree ${tree}`);
      }
    }).join('\n');
    return `{\n${result}\n${genIndent(spaceCount, (level - 1))}}`;
  };
  return iter(tree);
};
