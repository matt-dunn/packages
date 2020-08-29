import {ErrorMeta} from "./types";

export function isErrorMeta (o: any): o is ErrorMeta {
  return Boolean(o && o.component);
}

