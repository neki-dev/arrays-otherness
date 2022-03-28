const assert = require('assert');
const otherness = require('../dist');

describe('arrays otherness', () => {
  let sync;

  before(() => {
    const currentArray = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Sam' },
      { id: 3, name: 'Nick' },
    ];

    const targetArray = [
      { id: 1, name: 'Jonny' },
      { id: 3, name: 'Nick' },
      { id: 4, name: 'Lisa' },
      { id: 5, name: 'Frank' },
    ];

    sync = otherness(
      currentArray,
      targetArray,
      (targetItem, currentItem) => (targetItem.id === currentItem.id),
    );
  });

  it('should return exess items', () => {
    const result = [];
    sync.excess((currentItem) => {
      result.push(currentItem);
    });

    assert.equal(result.length, 1);
    assert.equal(result[0].id, 2);
  });

  it('should return match items', () => {
    const result = [];
    sync.match((targetItem, currentItem) => {
      result.push(currentItem);
    });

    assert.equal(result.length, 2);
    assert.equal(result[0].id, 1);
    assert.equal(result[1].id, 3);
  });

  it('should return missing items', () => {
    const result = [];
    sync.missing((targetItem) => {
      result.push(targetItem);
    });

    assert.equal(result.length, 2);
    assert.equal(result[0].id, 4);
    assert.equal(result[1].id, 5);
  });
});
