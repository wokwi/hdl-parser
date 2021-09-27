# hdl-parser

Parser for [nand2tetris](https://www.nand2tetris.org/) HDL (Hardware Description Language), built on top of [Peggy](https://peggyjs.org/).

[![Build Status](https://travis-ci.org/wokwi/hdl-parser.png?branch=master)](https://travis-ci.org/wokwi/hdl-parser)
[![NPM Version](https://img.shields.io/npm/v/hdl-parser)](https://www.npmjs.com/package/hdl-parser)
![License: MIT](https://img.shields.io/npm/l/hdl-parser)
![Types: TypeScript](https://img.shields.io/npm/types/hdl-parser)

## Usage example

```javascript
const { parse } = require('hdl-parser');

console.log(parse(`
  CHIP Not {
    IN in;
    OUT out;

    PARTS:
    Nand(a=in, b=true, out=out);
  }
`));
```

And the result:

```js
({
  name: 'Not',
  definitions: [
    { type: 'IN', pins: [{ name: 'in', bits: 1 }] },
    { type: 'OUT', pins: [{ name: 'out', bits: 1 }] },
  ],
  parts: [
    {
      name: 'Nand',
      connections: [
        { from: { pin: 'a', bits: null }, to: { pin: 'in', bits: null } },
        { from: { pin: 'b', bits: null }, to: { const: 'true' } },
        { from: { pin: 'out', bits: null }, to: { pin: 'out', bits: null } },
      ],
    },
  ],
})
```

For more examples, see the [tests file](tests.js).

## License

Released under the terms of [the MIT licence](LICENSE). Copyright (c) 2021, Uri Shaked.
