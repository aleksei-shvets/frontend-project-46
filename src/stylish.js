import _ from 'lodash';

const isObjectNotArray = (obj) => _.isObject(obj) && !Array.isArray(obj);

const stringify = (object) => {
  const tab = '  ';
  const iter = (element, depht = 1) => {
    if (!isObjectNotArray(element)) {
      return element;
    }
    const entries = Object.entries(element);
    const string = entries
      .map(([key, value]) => `{\n${tab.repeat(depht + 2)}${key}: ${iter(value, depht + 1)}\n${tab.repeat(depht)}}`).join('\n');
    //return `{\n${tab.repeat(level)}${string}\n${tab.repeat(level - 1)}}`;
    return string;
  };
  return iter(object);
};

export default (tree) => {
  const iter = (treeArray, level = 1) => {
    const tab = '    ';
    const result = treeArray
      .map((object) => {
        if (object.type !== 'node') {
          if (object.type === 'notchanged') {
            return `${tab.repeat(level)}${object.key}: ${stringify(object.value)}`;
          }
          if (object.type === 'changed') {
            return `${tab.repeat(level)}- ${object.key}: ${stringify(object.value1)}\n${tab.repeat(level)}+ ${object.key}: ${stringify(object.value2)}`;
          }
          if (object.type === 'added') {
            return `${tab.repeat(level)}+ ${object.key}: ${stringify(object.value)}`;
          }
          if (object.type === 'deleted') {
            return `${tab.repeat(level)}- ${object.key}: ${stringify(object.value)}`;
          }
        }
        return `${tab.repeat(level)}${object.key}: ${stringify(iter(object.value, level + 1), level - 1)}`;
      })
      .join('\n');
    return `{\n${result}\n${tab.repeat(level - 1)}}`;
  };
  return iter(tree);
};

/*

import _ from 'lodash';

const isObjectNotArray = (obj) => _.isObject(obj) && !Array.isArray(obj);

const stringify = (object) => {
  const tab = ' ';
  const iter = (element, level = 1) => {
    if (!isObjectNotArray(element)) {
      return element;
    }
    const entries = Object.entries(element);
    return entries.map(([key, value]) => (
      !isObjectNotArray(value)
        ? `${tab.repeat(level)}${key}: ${value}`
        : `{\n${tab.repeat(level)}${key}: ${iter(value, level + 1)}\n${tab.repeat(level - 1)}${key}}`));
  };
  return iter(object);
};

export default (tree) => {
  const iter = (treeArray, level = 1) => {
    const tab = ' ';
    const result = treeArray
      .map((object) => {
        if (object.type !== 'node') {
          if (object.type === 'notchanged') {
            return `${tab.repeat(level)}${object.key}: ${stringify(object.value)}`;
          }
          if (object.type === 'changed') {
            return `${tab.repeat(level)}- ${object.key}
            : ${stringify(object.value1)}\n${tab.repeat(level)}+ ${object.key}: ${stringify(object.value2)}`;
          }
          if (object.type === 'added') {
            return `${tab.repeat(level)}+ ${object.key}: ${stringify(object.value)}`;
          }
          if (object.type === 'deleted') {
            return `${tab.repeat(level)}- ${object.key}: ${stringify(object.value)}`;
          }
        }
        return `${tab.repeat(level)}${object.key}: ${iter(object.value, level + 1)}`;
      })
      .join('\n');
    return `{\n${result}\n${tab.repeat(level - 1)}}`;
  };
  return iter(tree);
};

*/
