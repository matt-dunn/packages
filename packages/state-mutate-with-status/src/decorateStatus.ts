import isEqual from "lodash/isEqual";

import { Status, MetaStatus, symbolActiveTransactions } from "./status";

const getError = (metaStatus: MetaStatus, status: Status = {} as Status, isCurrent = true) => {
  if (isCurrent) {
    return (metaStatus.processing && status.error) || metaStatus.error;
  }

  return status.error;
};

export const decorateStatus = (metaStatus: MetaStatus, status: Status = {} as Status, isCurrent = true): Status => {
  const activeTransactions = { ...status[symbolActiveTransactions] };

  if (metaStatus.processing) {
    activeTransactions[metaStatus.transactionId] = isCurrent;
  } else {
    delete activeTransactions[metaStatus.transactionId];
  }

  const outstandingCurrentTransactionCount = Object.values(activeTransactions).filter(current => current === true).length;

  const updatedStatus = Status({
    ...metaStatus,
    lastUpdated: metaStatus.lastUpdated|| status.lastUpdated,
    complete: isCurrent ? outstandingCurrentTransactionCount === 0 : true,
    error: getError(metaStatus, status, isCurrent),
    [symbolActiveTransactions]: activeTransactions,
  });

  if (isEqual(updatedStatus, status)) {
    return status;
  }

  return updatedStatus;
};
