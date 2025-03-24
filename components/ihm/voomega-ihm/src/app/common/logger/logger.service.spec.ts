import { TestBed, inject } from '@angular/core/testing';

import { LoggerConfiguration, LogLevel, LoggerService } from '.';

describe('LoggerService', () => {
  function writeLogs(service: LoggerService) {
    service.log(LogLevel.ERROR, 'log in ERROR');
    service.log(LogLevel.WARNING, 'log in WARNING');
    service.log(LogLevel.INFORMATION, 'log in INFORMATION');
    service.log(LogLevel.DEBUG, 'log in DEBUG');
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: LoggerConfiguration, useValue: {level: LogLevel.DEBUG}}, LoggerService]
    });
    // spy console output
    spyOn(console, 'log');
    spyOn(console, 'debug');
    spyOn(console, 'info');
    spyOn(console, 'warn');
    spyOn(console, 'error');
  });

  it('should be created',
    inject([LoggerService], (service: LoggerService) => {
    expect(service).toBeTruthy();
  }));

  it('should write logs from ERROR levels',
    inject([LoggerService, LoggerConfiguration], (service: LoggerService, config: LoggerConfiguration) => {

    config.level = LogLevel.ERROR;
    writeLogs(service);
    expect(console.error).toHaveBeenCalledWith('log in ERROR');
    expect(console.warn).not.toHaveBeenCalledWith('log in WARNING');
    expect(console.log).not.toHaveBeenCalledWith('log in INFORMATION');
    expect(console.debug).not.toHaveBeenCalledWith('log in DEBUG');
  }));

  it('should write logs from WARNING levels',
    inject([LoggerService, LoggerConfiguration], (service: LoggerService, config: LoggerConfiguration) => {

    config.level = LogLevel.WARNING;
    writeLogs(service);
    expect(console.error).toHaveBeenCalledWith('log in ERROR');
    expect(console.warn).toHaveBeenCalledWith('log in WARNING');
    expect(console.log).not.toHaveBeenCalledWith('log in INFORMATION');
    expect(console.debug).not.toHaveBeenCalledWith('log in DEBUG');
  }));

  it('should write logs from INFORMATION levels',
    inject([LoggerService, LoggerConfiguration], (service: LoggerService, config: LoggerConfiguration) => {

    config.level = LogLevel.INFORMATION;
    writeLogs(service);
    expect(console.error).toHaveBeenCalledWith('log in ERROR');
    expect(console.warn).toHaveBeenCalledWith('log in WARNING');
    expect(console.log).toHaveBeenCalledWith('log in INFORMATION');
    expect(console.debug).not.toHaveBeenCalledWith('log in DEBUG');
  }));

  it('should write logs from DEBUG levels',
    inject([LoggerService, LoggerConfiguration], (service: LoggerService, config: LoggerConfiguration) => {

    config.level = LogLevel.DEBUG;
    writeLogs(service);
    expect(console.error).toHaveBeenCalledWith('log in ERROR');
    expect(console.warn).toHaveBeenCalledWith('log in WARNING');
    expect(console.log).toHaveBeenCalledWith('log in INFORMATION');
    expect(console.debug).toHaveBeenCalledWith('log in DEBUG');
  }));

  it('should write logs of all levels',
    inject([LoggerService, LoggerConfiguration], (service: LoggerService, config: LoggerConfiguration) => {

    config.level = LogLevel.ALL;
    writeLogs(service);
    expect(console.error).toHaveBeenCalledWith('log in ERROR');
    expect(console.warn).toHaveBeenCalledWith('log in WARNING');
    expect(console.log).toHaveBeenCalledWith('log in INFORMATION');
    expect(console.debug).toHaveBeenCalledWith('log in DEBUG');
  }));
});
