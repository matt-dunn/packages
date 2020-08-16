export interface APPError extends Error { name: string; code: number | string }

export class APPError extends Error implements APPError {
  __proto__: Error;
  name: string;
  code: number | string;

  constructor(message: string, code: number | string) {
    const trueProto = new.target.prototype;
    super(message);

    this.name = "APPError";
    this.code = code;
    this.__proto__ = trueProto;
  }
}

