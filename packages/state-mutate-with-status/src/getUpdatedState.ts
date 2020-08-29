import {ErrorLike} from "@matt-dunn/error";
import {get, isFunction, omit} from "lodash";
import {wrap} from "object-path-immutable";

import {MetaStatus, symbolStatus} from "./status";
import {Options} from "./updateState";
import {Path} from "./types";

import {decorateStatus} from "./decorateStatus";

type UpdatedStatus<S> = {
  readonly updatedState: S;
  readonly originalPathState: any;
  readonly isBaseObject: boolean;
};

export const getUpdatedState = <S, P, PayloadMetaStatus extends MetaStatus>(state: S, payload: P | ErrorLike | undefined | null, metaStatus: PayloadMetaStatus, path: Path, actionId?: string, options?: Options<S, P | ErrorLike>): UpdatedStatus<S> => {
  const currentState = get(state, path);

  if (actionId && Array.isArray(currentState)) {
    const index = currentState.findIndex(item => item.id === actionId);

    if (index === -1 && options?.autoInsert === true) {
      if (payload && !isFunction(payload)) {
        const { getNewItemIndex } = options || {} as Options<S, P>;

        return {
          updatedState: wrap(state).insert(path, Object.assign({}, payload, { [symbolStatus]: decorateStatus(metaStatus) }), getNewItemIndex ? getNewItemIndex(currentState, payload) : currentState.length).value(),
          originalPathState: currentState,
          isBaseObject: false
        };
      }
    } else if (payload === null && options?.autoDelete === true) {
      return {
        updatedState: wrap(state)
          .del(
            [...path, index.toString()]
          )
          .value(),
        originalPathState: currentState,
        isBaseObject: false
      };
    } else if (index !== -1) {
      return {
        updatedState: wrap((payload && wrap(state).assign([...path, index.toString()], payload).value()) || state)
          .update(
            [...path, index.toString(), symbolStatus as any],
            state => decorateStatus(metaStatus, state && state[symbolStatus])
          )
          .value(),
        originalPathState: currentState,
        isBaseObject: false
      };
    }

    return {
      updatedState: state,
      originalPathState: currentState,
      isBaseObject: false
    };
  } else {
    const array = options?.appendArrayPath ? get(payload, options.appendArrayPath) : payload;

    if (options?.appendArray && Array.isArray(array)) {
      const appendPath = options?.appendArrayPath ? path.concat(options.appendArrayPath) : path;

      return {
        updatedState: (array.reduce((state, item) => state.push(appendPath, item), wrap(state).assign(path, options.appendArrayPath ? omit(payload as any, options.appendArrayPath) : payload)).value()) || state,
        originalPathState: currentState,
        isBaseObject: true
      };
    }

    return {
      updatedState: (payload && wrap(state).assign(path, payload).value()) || state,
      originalPathState: currentState,
      isBaseObject: true
    };
  }
};
