import _ from 'lodash';

const makeDiffTree = (content1, content2) => {
  const keys = Object.keys({ ...content1, ...content2 });
  const tree = _.sortBy(keys, (key) => key)
    .map((key) => {
      if (_.isPlainObject(content1[key]) && _.isPlainObject(content2[key])) {
        return { type: 'node', key: `${key}`, value: makeDiffTree(content1[key], content2[key]) };
      }
      if (_.has(content1, key) && !_.has(content2, key)) {
        return { type: 'deleted', key: `${key}`, value: content1[key] };
      }
      if (!_.has(content1, key) && _.has(content2, key)) {
        return { type: 'added', key: `${key}`, value: content2[key] };
      }
      if (content1[key] === content2[key]) {
        return { type: 'notchanged', key: `${key}`, value: content1[key] };
      }
      return {
        type: 'changed', key: `${key}`, value1: content1[key], value2: content2[key],
      };
    });
  return tree;
};

export default makeDiffTree;
