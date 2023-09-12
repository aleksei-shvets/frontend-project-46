import _ from 'lodash';

const genTab = (level = 1) => {
  const oneSpace = ' ';
  return oneSpace.repeat(level);
};

const stringify = (object, level = 0) => {
  const iter = (element, depth = 1, spaceCount = 4) => {
    if (!_.isObject(element)) {
      return element;
    }
    const entries = Object.entries(element);
    if (entries.length === 0) {
      return '{}';
    }
    const string = entries
      .map(([key, value]) => {
        if (!_.isObject(value)) {
          return `${key}: ${value}`;
        }
        return `${key}: ${iter(value, depth + 1)}`;
      })
      .join(`\n${genTab(spaceCount * (depth + level))}`);
    return `{\n${genTab(spaceCount * (depth + level))}${string}\n${genTab(spaceCount * (depth - 1 + level))}}`;
  };
  return iter(object);
};

export default (tree) => {
  const iter = (treeArray, level = 1, spaceCount = 4) => {
    const result = treeArray.map((object) => {
      if (object.type !== 'node') {
        if (object.type === 'notchanged') {
          return `${genTab(spaceCount * level)}${object.key}: ${stringify(object.value, level)}`;
        }
        if (object.type === 'changed') {
          return `${genTab(spaceCount * level - 2)}- ${object.key}: ${stringify(object.value1, level)}\n${genTab(spaceCount * level - 2)}+ ${object.key}: ${stringify(object.value2)}`;
        }
        if (object.type === 'added') {
          return `${genTab(spaceCount * level - 2)}+ ${object.key}: ${stringify(object.value, level)}`;
        }
        if (object.type === 'deleted') {
          return `${genTab(spaceCount * level - 2)}- ${object.key}: ${stringify(object.value, level)}`;
        }
      }
      return `${genTab(spaceCount * level)}${object.key}: ${iter(object.value, level + 1)}`;
    }).join('\n');
    return `{\n${result}\n${genTab(spaceCount * (level - 1))}}`;
  };
  return iter(tree);
};
