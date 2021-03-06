import {GetPath, isGetPath, Path, StandardAction} from "./types";
import {ActionMeta, MetaStatus, symbolStatus} from "./status";
import {get} from "lodash";
import {wrap} from "object-path-immutable";
import isPromise from "is-promise";

import {getUpdatedState} from "./getUpdatedState";
import {getPayload} from "./utils";
import {decorateStatus} from "./decorateStatus";

type GetNewItemIndex<P> = {
  (array: any[], payload: P): number;
};

export type Options<S, P> = {
  readonly path?: Path | GetPath<S, P>;
  readonly getNewItemIndex?: GetNewItemIndex<P>;
  readonly autoInsert?: boolean;
  readonly autoDelete?: boolean;
  readonly appendArray?: boolean;
  readonly appendArrayPath?: string;
};

export const updateState = <S, P extends S>(state: S, { meta, error, payload }: StandardAction<P>, options?: Options<S, P>): S => {
  if (isPromise(payload)) {
    return state;
  }

  const { path = [] } = options || {} as Options<S, P>;

  const {
    id: actionId,
    $status: metaStatus = {
      error: error && payload,
      processing: false,
      complete: false
    } as MetaStatus,
  } = meta || {} as ActionMeta;

  const updatePath = isGetPath(path) ? path(state, payload, meta) : path;

  if (!updatePath) {
    return state;
  }

  const status = get(state, [...updatePath, symbolStatus]);

  const { updatedState, isBaseObject } = getUpdatedState(
    state,
    getPayload(metaStatus, payload),
    metaStatus,
    updatePath,
    actionId,
    options
  );

  return wrap(updatedState).set(
    [...updatePath, symbolStatus as any],
    decorateStatus(metaStatus, status, isBaseObject === true)
  ).value();
};
