import { ApplicationErrorCode } from "./application.error.code";

export class ApplicationError extends Error {
  private readonly errorName : string = "ApplicationErrorCode";
  private readonly errorCode : ApplicationErrorCode;
  private readonly throwable ? : Error;

  constructor(errorCode:ApplicationErrorCode, msg?:string, throwable?: Error) {
    super( (undefined === msg)? "@@@@@@>APPLICATION_ERROR_MSG<@@@@@@":msg );
    Object.setPrototypeOf(this, ApplicationError.prototype);
    this.name = this.errorName;
    this.errorCode = errorCode;
    if(undefined !== throwable && null !== throwable) {
      this.throwable = throwable;
    } else {
      this.throwable = Error(errorCode.valueOf().toString());
      this.stack = (<any> new Error()).stack;
    }
  }

  public getErrorCode() : ApplicationErrorCode {
    return this.errorCode;
  }
  public getMessage() : string {
    return this.message;
  }

  public getCause() : Error {
    return <Error> this.throwable;
  }

  public getStack() : string {
    return <string> this.stack;
  }
}
