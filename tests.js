const { test } = require('uvu');
const assert = require('uvu/assert');
const { parse } = require('./src/index');

test('parse Inc16 chip', () => {
  const hdl = `
    /**
     * 16-bit incrementer:
     * out = in + 1 (arithmetic addition)
     */
    
    CHIP Inc16 {
        IN in[16];
        OUT out[16];
    
        PARTS:
        // Put you code here:
        Add16(a[0]=true, b=in, out=out);
    }`;

  assert.equal(parse(hdl), {
    name: 'Inc16',
    definitions: [
      { type: 'IN', pins: [{ name: 'in', bits: 16 }] },
      { type: 'OUT', pins: [{ name: 'out', bits: 16 }] },
    ],
    parts: [
      {
        name: 'Add16',
        connections: [
          {
            from: { pin: 'a', bits: 0 },
            to: { const: 'true' },
          },
          {
            from: { pin: 'b', bits: null },
            to: { pin: 'in', bits: null },
          },
          {
            from: { pin: 'out', bits: null },
            to: { pin: 'out', bits: null },
          },
        ],
      },
    ],
  });
});

test('parse a chip definition with BUILTIN and CLOCKED pins', () => {
  const hdl = `
    CHIP Bit {

      IN  in, load;
      OUT out;

      BUILTIN Bit;
      CLOCKED in, load;
    }
`;
  assert.equal(parse(hdl), {
    name: 'Bit',
    definitions: [
      {
        type: 'IN',
        pins: [
          { name: 'in', bits: 1 },
          { name: 'load', bits: 1 },
        ],
      },
      { type: 'OUT', pins: [{ name: 'out', bits: 1 }] },
      { type: 'BUILTIN', name: 'Bit' },
      { type: 'CLOCKED', pins: ['in', 'load'] },
    ],
    parts: null,
  });
});

test('Issue #1', () => {
  const hdl = `
    CHIP Or {
      IN a, b;
      OUT out;

      PARTS:
      Nand (a = nota, b=notb, out=out);
      Not (in=a, out=nota);
      Not (in=b, out=notb);
    }
  `;
  assert.equal(parse(hdl), {
    name: 'Or',
    definitions: [
      {
        type: 'IN',
        pins: [
          { name: 'a', bits: 1 },
          { name: 'b', bits: 1 },
        ],
      },
      { type: 'OUT', pins: [{ name: 'out', bits: 1 }] },
    ],
    parts: [
      {
        name: 'Nand',
        connections: [
          { from: { pin: 'a', bits: null }, to: { pin: 'nota', bits: null } },
          { from: { pin: 'b', bits: null }, to: { pin: 'notb', bits: null } },
          { from: { pin: 'out', bits: null }, to: { pin: 'out', bits: null } },
        ],
      },
      {
        name: 'Not',
        connections: [
          { from: { pin: 'in', bits: null }, to: { pin: 'a', bits: null } },
          { from: { pin: 'out', bits: null }, to: { pin: 'nota', bits: null } },
        ],
      },
      {
        name: 'Not',
        connections: [
          { from: { pin: 'in', bits: null }, to: { pin: 'b', bits: null } },
          { from: { pin: 'out', bits: null }, to: { pin: 'notb', bits: null } },
        ],
      },
    ],
  });
});

test.run();
