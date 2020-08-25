import { isObject } from "lodash";

import { MetaStatus, symbolStatus } from "./";
import {ErrorLike} from "@matt-dunn/error";

const clone = (o: any) => {
  if (Array.isArray(o)) {
    return [...o];
  } else if (isObject(o)) {
    return { ...o };
  }
  return o;
};

const getSymbolName = (symbol: symbol): string => {
  return `$$${symbol.toString()}`;
};

const convertStatusSymbolToString = (o: any) => {
  if (o && o[symbolStatus]) {
    const c = clone(o);
    c[getSymbolName(symbolStatus)] = o[symbolStatus];
    delete c[symbolStatus];
    return c;
  }
  return o;
};

export const serialize = (o: any): string => {
  return o && JSON.stringify(o, (key: string, v: any) => {
    const value = convertStatusSymbolToString(v);

    if (Array.isArray(value)) {
      const keys = Object.keys(value);

      if (keys.length !== value.length) {
        return {
          $$arr: {
            $: [...value],
            _: keys.reduce((o, key: any) => {
              if (isNaN(key)) {
                o[key] = value[key];
              }
              return o;
            }, {} as any)
          }
        };
      }
    }

    return value;
  });
};

const convertStatusSymbolToSymbol = (o: any) => {
  if (o && o[getSymbolName(symbolStatus)]) {
    const c = clone(o);
    c[symbolStatus] = o[getSymbolName(symbolStatus)];
    delete c[getSymbolName(symbolStatus)];
    return c;
  }
  return o;
};

export const deserialize = (s: string): any => {
  return s && JSON.parse(s, (key, v) => {
    const value = convertStatusSymbolToSymbol(v);
    if (value && value.$$arr) {
      const { $: array = [], _: values } = value.$$arr;

      values && Object.getOwnPropertyNames(values).concat(Object.getOwnPropertySymbols(values) as unknown as string[]).forEach(key => {
        array[key] = values[key];
      });

      return array;
    }
    return value;
  });
};

export const getPayload = <TMetaStatus extends MetaStatus, P>(metaStatus: TMetaStatus, payload?: P | ErrorLike): P | ErrorLike | undefined => (!metaStatus.error && payload) || undefined;


