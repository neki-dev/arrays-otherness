import assert from 'assert';
import otherness from '../src';
import { ResultHandlers } from '../src/types';

type TestItem = {
  id: number
  name: string
};

describe('arrays otherness', () => {
  let sync: ResultHandlers<TestItem>;

  before(() => {
    const originArray: TestItem[] = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Sam' },
      { id: 3, name: 'Nick' },
    ];

    const targetArray: TestItem[] = [
      { id: 1, name: 'Jonny' },
      { id: 3, name: 'Nick' },
      { id: 4, name: 'Lisa' },
      { id: 5, name: 'Frank' },
    ];

    sync = otherness<TestItem>(
      originArray,
      targetArray,
      ({ origin, target }) => (origin.id === target.id),
    );
  });

  it('should return exess items', () => {
    const result: TestItem[] = [];
    sync.excess(({ origin }) => {
      result.push(origin);
    });

    assert.equal(result.length, 1);
    assert.equal(result[0].id, 2);
  });

  it('should return match items', () => {
    const result: TestItem[] = [];
    sync.match(({ origin }) => {
      result.push(origin);
    });

    assert.equal(result.length, 2);
    assert.equal(result[0].id, 1);
    assert.equal(result[1].id, 3);
  });

  it('should return missing items', () => {
    const result: TestItem[] = [];
    sync.missing(({ target }) => {
      result.push(target);
    });

    assert.equal(result.length, 2);
    assert.equal(result[0].id, 4);
    assert.equal(result[1].id, 5);
  });
});
