import {Status, MetaStatus, getStatus, symbolActiveTransactions, symbolStatus} from "./status";

describe("Status", () => {
  it("should return default status", () => {
    expect(Status()).toMatchObject({
      lastUpdated: undefined,
      cancelled: false,
      error: undefined,
      complete: false,
      processedOnServer: true,
      hasError: false,
      processing: false,
      outstandingTransactionCount: 0,
      outstandingCurrentTransactionCount: 0,
      updatingChildren: false
    });
  });

  it("should calculate outstanding transactions", () => {
    expect(Status({
      processing: true,
      complete: false,
      [symbolActiveTransactions]: {
        ["123"]: true
      }
    })).toMatchObject({
      lastUpdated: undefined,
      cancelled: false,
      error: undefined,
      complete: false,
      processedOnServer: true,
      hasError: false,
      processing: true,
      outstandingTransactionCount: 1,
      outstandingCurrentTransactionCount: 1,
      updatingChildren: false
    });

    expect(Status({
      processing: true,
      complete: false,
      [symbolActiveTransactions]: {
        ["123"]: true,
        ["234"]: true,
      }
    })).toMatchObject({
      lastUpdated: undefined,
      cancelled: false,
      error: undefined,
      complete: false,
      processedOnServer: true,
      hasError: false,
      processing: true,
      outstandingTransactionCount: 2,
      outstandingCurrentTransactionCount: 2,
      updatingChildren: false
    });
  });

  it("should calculate outstanding child transactions", () => {
    expect(Status({
      processing: true,
      complete: false,
      [symbolActiveTransactions]: {
        ["123"]: true
      }
    })).toMatchObject({
      lastUpdated: undefined,
      cancelled: false,
      error: undefined,
      complete: false,
      processedOnServer: true,
      hasError: false,
      processing: true,
      outstandingTransactionCount: 1,
      outstandingCurrentTransactionCount: 1,
      updatingChildren: false
    });

    expect(Status({
      processing: true,
      complete: false,
      [symbolActiveTransactions]: {
        ["123"]: true,
        ["234"]: false,
      }
    })).toMatchObject({
      lastUpdated: undefined,
      cancelled: false,
      error: undefined,
      complete: false,
      processedOnServer: true,
      hasError: false,
      processing: true,
      outstandingTransactionCount: 2,
      outstandingCurrentTransactionCount: 1,
      updatingChildren: true
    });
  });

  it("should return correct error status", () => {
    expect(Status({
      processing: true,
      complete: false,
      error: new Error(),
      [symbolActiveTransactions]: {
        ["123"]: true
      }
    })).toMatchObject({
      lastUpdated: undefined,
      cancelled: false,
      error: {},
      complete: false,
      processedOnServer: true,
      hasError: true,
      processing: true,
      outstandingTransactionCount: 1,
      outstandingCurrentTransactionCount: 1,
      updatingChildren: false
    });

    expect(Status({
      processing: true,
      complete: false,
      [symbolActiveTransactions]: {
        ["123"]: true,
        ["234"]: false,
      }
    })).toMatchObject({
      lastUpdated: undefined,
      cancelled: false,
      error: undefined,
      complete: false,
      processedOnServer: true,
      hasError: false,
      processing: true,
      outstandingTransactionCount: 2,
      outstandingCurrentTransactionCount: 1,
      updatingChildren: true
    });
  });
});

describe("MetaStatus", () => {
  it("should return default status", () => {
    expect(MetaStatus({
      complete: false,
      processing: true
    })).toEqual({
      processing: true,
      complete: false
    });
  });
});

describe("getStatus", () => {
  it("should return default status with no payload status", () => {
    expect(getStatus()).toMatchObject({
      lastUpdated: undefined,
      cancelled: false,
      error: undefined,
      complete: false,
      processedOnServer: true,
      hasError: false,
      processing: false,
      outstandingTransactionCount: 0,
      outstandingCurrentTransactionCount: 0,
      updatingChildren: false
    });
  });

  it("should return status from payload status", () => {
    expect(getStatus({
      [symbolStatus]: Status({
        processing: true,
        complete: false,
        [symbolActiveTransactions]: {
          ["123"]: true
        }
      })
    })).toMatchObject({
      lastUpdated: undefined,
      cancelled: false,
      error: undefined,
      complete: false,
      processedOnServer: true,
      hasError: false,
      processing: true,
      outstandingTransactionCount: 1,
      outstandingCurrentTransactionCount: 1,
      updatingChildren: false
    });
  });
});
