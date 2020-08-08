# nanometa

nanometa is a JavaScript library to aid metaprogramming and the creation of DSLs.

![It ain't much, but it's honest work](aint_much.jpg)

## Installation

If you're on node/npm:

```sh
$ npm i -s nanometa
```

Then `require('nanometa')` as usual.

If you're on Deno or the browser, you can use one of the following CDN-based ES module import statements:

```js
import meta from 'https://unpkg.com/nanometa';
import meta from 'https://cdn.skypack.dev/nanometa';
```

On the browser, don't forget to use the `type="module"` script tag attribute to enable ES module support:

```html
<script type="module">
  import meta from '...';
</script>
```

## Usage

This is the kind of library that's most easily explained by means of an example. Imagine you're building a C metaprogramming DSL in JavaScript. The first part of the challenge would be to pick a DSL syntax that reads naturally in JavaScript. Something like this looks good enough to me:

```js
c.file('hello.c', c => {
  c.import('<stdio.h>');

  c.func('main', c => {
    c.returns('int');

    c.call('printf', 'Hello, world!\n');
    c.return(0);
  });
});
```

With just a little help from nanometa, the above code can easily be used to generate an AST-like array that can later be analyzed, transformed, interpreted, and/or used to generate C code:

```js
import meta from 'nanometa';

let c = meta({
  file: (name, fn) => [name, c.block(fn)],
  func: (name, fn) => ['func', name, c.block(fn)],
});

let file = c.file('hello.c', ...);

console.log(JSON.stringify(file, null, 2));
```

The code above will produce roughly the following JSON output:

```js
[
  'hello.c', [
    ['import', '<stdio.h>'],

    ['func', 'main', [
      ['returns', 'int'],

      ['call', 'printf', 'Hello, world!\n'],
      ['return', 0],
    ]],
  ]
]
```

What's going on here is that `c.whatever(...xs)` returns `['whatever', ...xs]`, and `c.block(fn)` calls `fn` with a proxied version of `c` (let's call it `d`) which captures the return values of all `d.whatever(...)` function calls inside of it and returns an array of those, so it can be used to implement natural-looking nested code blocks.

What to do with the resulting AST-like array is completely up to you.

## License

![](https://www.gnu.org/graphics/agplv3-155x51.png)

nanometa is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

## Exclusion of warranty

nanometa is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

A copy of AGPLv3 can be found in [COPYING.](COPYING)
