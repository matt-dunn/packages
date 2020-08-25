import {ErrorLike} from "@matt-dunn/error";
import {get, isFunction, omit} from "lodash";
import {wrap} from "object-path-immutable";

import {MetaStatus, symbolStatus} from "./status";
import {Options} from "./updateState";
import {Path} from "./types";

import {decorateStatus} from "./decorateStatus";

type UpdatedStatus<S, P> = {
  readonly updatedState: S;
  readonly originalState?: P | null;
  readonly isCurrent?: boolean;
};

export const getUpdatedState = <S, P extends S, TMetaStatus extends MetaStatus>(state: S, payload: P | ErrorLike | undefined | null, metaStatus: TMetaStatus, path: Path, actionId?: string, options?: Options<S, P | ErrorLike>): UpdatedStatus<S, P> => {
  const currentState = get(state, path);

  if (actionId && Array.isArray(currentState)) {
    const index = currentState.findIndex(item => item.id === actionId);

    if (index === -1 && options?.autoInsert === true) {
      if (payload && !isFunction(payload)) {
        const { getNewItemIndex } = options || {} as Options<S, P>;

        return {
          updatedState: wrap(state).insert(path, Object.assign({}, payload, { [symbolStatus]: decorateStatus(metaStatus) }), getNewItemIndex ? getNewItemIndex(currentState, payload) : currentState.length).value(),
          originalState: null // Ensure final payload is not set so this item can be removed from the array on failure
        };
      }
    } else if (payload === null && options?.autoDelete === true) {
      return {
        updatedState: wrap(state)
          .del(
            [...path, index.toString()]
          )
          .value()
      };
    } else {
      return {
        updatedState: wrap((payload && wrap(state).assign([...path, index.toString()], payload).value()) || state)
          .update(
            [...path, index.toString(), symbolStatus as any],
            state => decorateStatus(metaStatus, state && state[symbolStatus])
          )
          .value(),
        originalState: get(state, [...path, index.toString()])
      };
    }

    return {
      updatedState: state
    };
  } else {
    const array = options?.appendArrayPath ? get(payload, options.appendArrayPath) : payload;

    if (options?.appendArray && Array.isArray(array)) {
      const appendPath = options?.appendArrayPath ? path.concat(options.appendArrayPath) : path;

      return {
        updatedState: (array.reduce((state, item) => state.push(appendPath, item), wrap(state).assign(path, options.appendArrayPath ? omit(payload as any, options.appendArrayPath) : payload)).value()) || state,
        originalState: currentState,
        isCurrent: true
      };
    }

    return {
      updatedState: (payload && wrap(state).assign(path, payload).value()) || state,
      originalState: currentState,
      isCurrent: true
    };
  }
};
