export interface IDefinitionPin {
  name: string;
  bits: number;
}

export interface IChipIn {
  type: 'IN';
  pins: IDefinitionPin[];
}

export interface IChipOut {
  type: 'OUT';
  pins: IDefinitionPin[];
}

export interface IChipBuiltin {
  type: 'BUILTIN';
  name: string;
}

export interface IChipClocked {
  type: 'CLOCKED';
  pins: string[];
}

export type IChipDefinition = IChipIn | IChipOut | IChipBuiltin | IChipClocked;

export interface IConnectionPin {
  pin: string;
  bits: number | null | { from: number; to: number };
}

export interface IConstantPin {
  const: 'true' | 'false';
}

export interface IChipConnection {
  from: IConnectionPin;
  to: IConnectionPin | IConstantPin;
}

export interface IChipPart {
  name: string;
  connections: IChipConnection[];
}

export interface IChip {
  name: string;
  definitions: IChipDefinition[];
  parts: IChipPart[] | null;
}

import { ParserOptions } from './peg-types';
export { SyntaxError } from './peg-types';
export function parse(input: string, options?: ParserOptions): IChip;
