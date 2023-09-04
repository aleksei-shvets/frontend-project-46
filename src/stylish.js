import _ from 'lodash';

const genTab = (spaces, level = 1) => {
  const oneSpace = ' ';
  return oneSpace.repeat(spaces * level);
};

const stringify = (object, level = 0) => {
  const iter = (element, depth = 1) => {
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
        return `${key}: ${iter(value, (depth + level + 1))}`;
      })
      .join(`\n${genTab(4, depth + level)}`);
    return `{\n${genTab(4, depth + level)}${string}\n${genTab(4, depth - 1 + level)}}`;
  };
  return iter(object);
};

export default (tree) => {
  const iter = (treeArray, level = 1) => {
    const tab = '  ';
    const result = treeArray.map((object) => {
      if (object.type !== 'node') {
        if (object.type === 'notchanged') {
          return `${genTab(5, level)}${object.key}: ${stringify(object.value, level)}`;
        }
        if (object.type === 'changed') {
          return `${genTab(4, level)}- ${object.key}: ${stringify(object.value1, level)}\n${tab.repeat(4, level)}+ ${object.key}: ${stringify(object.value2)}`;
        }
        if (object.type === 'added') {
          return `${genTab(4, level)}+ ${object.key}: ${stringify(object.value, level)}`;
        }
        if (object.type === 'deleted') {
          return `${genTab(4, level)}- ${object.key}: ${stringify(object.value, level)}`;
        }
      }
      return `${genTab(4, level)}${object.key}: ${iter(object.value, level + 1)}`;
    }).join('\n');
    return `{\n${result}\n${genTab(4, level - 1)}}`;
  };
  return iter(tree);
};
