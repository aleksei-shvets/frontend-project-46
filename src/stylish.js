export default (tree) => {
  const iter = (treeArray, level = 1) => {
    const tab = ' ';
    const result = treeArray.map((object) => {
      if (object.type !== 'node') {
        if (object.type === 'notchanged') {
          return `${tab.repeat(level)}${object.key}: ${object.value}`;
        }
        if (object.type === 'changed') {
          return `${tab.repeat(level)}- ${object.key}: ${object.value1}\n${tab.repeat(level)}+ ${object.key}: ${object.value2}`;
        }
        if (object.type === 'added') {
          return `${tab.repeat(level)}+ ${object.key}: ${object.value}`;
        }
        if (object.type === 'deleted') {
          return `${tab.repeat(level)}- ${object.key}: ${object.value}`;
        }
      }
      return `${tab.repeat(level)}${object.key}: ${iter(object.value, level + 1)}`;
    }).join('\n');
    return `{\n${result}\n${tab.repeat(level - 1)}}`;
  };
  return iter(tree);
};
