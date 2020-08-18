import {APPError} from "./APPError";

export interface APIError extends APPError { status: number }

expxxort class APIError extends APPError implements APIError {
  readonly name: string;

  constructor(message: string, code: number, public status: number) {
    super(message, code);

    this.name = "APIError";
    this.status = status;
  }
}

export const withAPIError = async <P>(invoker: () => P) => {
  try {
    return await invoker();
  } catch (ex) {
    throw new APIError(ex.response?.statusText || `Request failed with status code ${ex.response?.status}`, ex.response?.data?.code, ex.response?.status);
  }
};
