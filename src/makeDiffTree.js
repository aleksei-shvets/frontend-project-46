import _ from 'lodash';

const makeDiffTree = (obj1, obj2) => {
  const keys = _.union(Object.keys({ ...obj1, ...obj2 }));
  const tree = _.sortBy(keys, (key) => key)
    .map((key) => {
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return { type: 'nested', key: `${key}`, children: makeDiffTree(obj1[key], obj2[key]) };
      }
      if (!_.has(obj2, key)) {
        return { type: 'deleted', key: `${key}`, value: obj1[key] };
      }
      if (!_.has(obj1, key)) {
        return { type: 'added', key: `${key}`, value: obj2[key] };
      }
      if (obj1[key] === obj2[key]) {
        return { type: 'notchanged', key: `${key}`, value: obj1[key] };
      }
      return {
        type: 'changed', key: `${key}`, value1: obj1[key], value2: obj2[key],
      };
    });
  return tree;
};

export default makeDiffTree;
