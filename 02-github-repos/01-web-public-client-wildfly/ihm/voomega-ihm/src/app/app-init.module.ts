/**
 * Application initialization.
 * Loads the configuration file
 * @param configService
 */
import { CommonModule } from "@angular/common";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { environment } from "@environments/environment";
import { LoggerConfiguration, LoggerService, LogLevel } from "@common/logger";
import { ConfigurationService, RouteLoaderService, VIEWS_CONFIG_TOKEN } from "@services/configuration";
import { VIEWS_CONFIG } from "@views/config/views.config";
import { ConfigurationStoreService } from "./core/services/configuration/configuration.store.service";
import { StoreService } from "./core/services/store/webstorage";

export function initializeApplication(logger: LoggerService,
                                      configurationService: ConfigurationService,
                                      routeLoaderService: RouteLoaderService,
                                      configurationStoreService: ConfigurationStoreService) {
  return () => configurationService.load().then(() => {
    logger.log(LogLevel.INFORMATION, "###################\n CONFIGURATION LOADED \n###################\n");
    routeLoaderService.load();
    logger.log(LogLevel.INFORMATION,"###################\n ROUTES LOADED \n###################\n");
    configurationStoreService.storeResourceServiceConfiguration();
    logger.log(LogLevel.INFORMATION,"###################\n RESOURCE PLANNER CONFIGURATION STORED \n###################\n");
  });
}


/**
 * Module uses as initializer of the application
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ConfigurationService,
    { provide: LoggerConfiguration, useValue: {level: environment.logLevel} }, LoggerService,
    { provide: VIEWS_CONFIG_TOKEN, useValue: VIEWS_CONFIG },
    RouteLoaderService,
    ConfigurationStoreService,
    StoreService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApplication,
      deps: [LoggerService, ConfigurationService, RouteLoaderService, ConfigurationStoreService, StoreService],
      multi: true
    }
  ]
})
export class AppInitModule { }
