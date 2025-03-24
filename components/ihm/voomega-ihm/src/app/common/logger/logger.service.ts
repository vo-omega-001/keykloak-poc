import { Injectable } from '@angular/core';
import { LoggerConfiguration } from '.';
import { LogLevel } from '.';

/* tslint:disable:no-console */
@Injectable()
export class LoggerService {

  constructor(private config: LoggerConfiguration) { }

  /**
   * Log in ERROR level.
   * @param message  the message to log
   * @param data  optional a data
   */
  error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data);
  }

  /**
   * Log in WARNING level.
   * @param message  the message to log
   * @param data  optional a data
   */
  warn(message: string, data?: any): void {
    this.log(LogLevel.WARNING, message, data);
  }
  /**
   * Log in INFO level.
   * @param message  the message to log
   * @param data  optional a data
   */
  info(message: string, data?: any): void {
    this.log(LogLevel.INFORMATION, message, data);
  }

  /**
   * Log in DEBUG level.
   * @param message  the message to log
   * @param data  optional a data
   */
  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  /**
   * Log in the given level.
   * @param level  {@link LogLevel} the level of the log
   * @param message  the message to log
   * @param data  optional a data
   */
  log(level: LogLevel, message: string, data?: any): void {
    if (level > this.config.level) {
      return;
    }

    switch (level) {
      case LogLevel.ERROR:
        if (data !== null && data !== undefined) {
          console.error(message, data);
        } else {
          console.error(message);
        }
        break;
      case LogLevel.WARNING:
        if (data !== null && data !== undefined) {
          console.warn(message, data);
        } else {
          console.warn(message);
        }
        break;
      case LogLevel.INFORMATION:
        if (data !== null && data !== undefined) {
          console.log(message, data);
        } else {
          console.log(message);
        }
        break;
      case LogLevel.DEBUG:
        if (data !== null && data !== undefined) {
          console.debug(message, data);
        } else {
          console.debug(message);
        }
        break;
    }
  }
}
