import chai from 'chai';
import meta from './index.js';
import sinon from 'sinon';

let { assert } = chai;

describe('meta', () => {
  describe('default/proxy props', () => {
    it('return their name followed by all its arguments', () => {
      let m = meta();
      assert.deepEqual(m.whatever(1, 2, 3), ['whatever', 1, 2, 3]);
    });
  });

  describe('block built-in', () => {
    it('calls fn(proxy) and returns all captured proxy return values', () => {
      let m = meta();

      let fn = sinon.fake(m => {
        m.whatever1(1, 2, 3);
        m.whatever2(4, 5, 6);
      });

      let b = m.block(fn);

      assert(fn.calledOnce, 'fn is called once');

      assert.deepEqual(b, [
        ['whatever1', 1, 2, 3],
        ['whatever2', 4, 5, 6],
      ]);
    });
  });
});
