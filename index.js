let meta = (fns = {}) => {
  let p = new Proxy({
    block: fn => {
      let stmts = [];

      fn(new Proxy(p, {
        get: (target, k) => (...xs) => {
          let stmt = target[k](...xs);
          stmts.push(stmt);

          return stmt;
        },
      }));

      return stmts;
    },

    ...fns,
  }, {
    get: (target, k) => target[k] || ((...xs) => [k, ...xs]),
  });

  return p;
};

export default meta;
