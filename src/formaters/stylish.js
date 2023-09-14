import _ from 'lodash';

const genIndent = (level = 1) => (' ').repeat(level);

const stringify = (object, level = 0) => {
  const iter = (element, depth = 1, spaceCount = 4) => {
    if (!_.isObject(element)) return element;

    const entries = Object.entries(element);
    if (entries.length === 0) return '{}';

    const string = entries.map(([key, value]) => {
      if (!_.isObject(value)) return `${key}: ${value}`;
      return `${key}: ${iter(value, depth + 1)}`;
    })
      .join(`\n${genIndent(spaceCount * (depth + level))}`);

    return `{\n${genIndent(spaceCount * (depth + level))}${string}\n${genIndent(spaceCount * (depth + level - 1))}}`;
  };
  return iter(object);
};

export default (tree) => {
  const iter = (treeArray, level = 1, spaceCount = 4) => {
    const result = treeArray.map((object) => {
      if (object.type !== 'node') {
        switch (object.type) {
          case 'notchanged':
            return `${genIndent(spaceCount * level)}${object.key}: ${stringify(object.value, level)}`;
          case 'changed':
            return `${genIndent(spaceCount * level - 2)}- ${object.key}: ${stringify(object.value1, level)}\n${genIndent(spaceCount * level - 2)}+ ${object.key}: ${stringify(object.value2)}`;
          case 'added':
            return `${genIndent(spaceCount * level - 2)}+ ${object.key}: ${stringify(object.value, level)}`;
          case 'deleted':
            return `${genIndent(spaceCount * level - 2)}- ${object.key}: ${stringify(object.value, level)}`;
          default:
            throw new Error(`Unknown node in tree ${tree}`);
        }
      }
      return `${genIndent(spaceCount * level)}${object.key}: ${iter(object.value, level + 1)}`;
    }).join('\n');
    return `{\n${result}\n${genIndent(spaceCount * (level - 1))}}`;
  };
  return iter(tree);
};
