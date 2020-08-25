import {ActionMeta} from "./status";
import {ErrorLike} from "@matt-dunn/error";
import {isFunction} from "lodash";

export type StandardAction<P = any, M extends ActionMeta = ActionMeta> = {
  readonly type: string;
  readonly payload?: P | ErrorLike;
  readonly meta?: M;
  readonly error?: boolean;
};

export type Path = ReadonlyArray<string>;

export type GetPath<S, P> = (state: S, payload: P | ErrorLike | undefined, meta: StandardAction<P>["meta"] | undefined) => ReadonlyArray<string> | null;

export function isGetPath (o: any): o is GetPath<any, any> {
  return o && isFunction(o);
}
