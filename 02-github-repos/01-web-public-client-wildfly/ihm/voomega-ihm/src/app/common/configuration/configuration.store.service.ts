import { Injectable } from "@angular/core";
import { ResourcePlannerConfigurationService } from "../api";
import { StorageKey, StoreService } from "../store/webstorage";
import { WeekShiftPlanners } from "@app/core/data/configuration/resource.planner.configuration.model";
import _ from "lodash";
import { ConfigurationFactory } from "./configuration.factory";


@Injectable()
export class ConfigurationStoreService {

  constructor(private readonly resourcePlannerConfigurationService: ResourcePlannerConfigurationService,
              private readonly storeService: StoreService) { }

  public storeResourceServiceConfiguration() {
    this.resourcePlannerConfigurationService.getResourcePlannerConfiguration().subscribe(response => {
      var platformConfig = {
        "defaultPlatformTypeId": response.defaultPlatformTypeId,
        "platformTypes": response.platformTypes
      }
      this.storeService.saveSessionEntry(StorageKey.PLATFORM_CONFIGURATION, platformConfig);
      this.storeService.saveSessionEntry(StorageKey.TASK_CONFIGURATION, response.taskFeatureTypes);
      this.storeService.saveSessionEntry(StorageKey.CALENDAR_CONFIGURATION, response.weekShiftPlanners);
      this.storeService.saveSessionEntry(StorageKey.OPTIMISATION_PARAMETERS, response.optimizationParameters);
    });
  }

  public retrievePlatformConfiguration() {
    return this.storeService.retrieveSessionEntry(StorageKey.PLATFORM_CONFIGURATION);
  }

  public retrieveCalendarConfiguration(): Array<WeekShiftPlanners> {
    return ConfigurationFactory.toWeekShiftPlanners(
      this.storeService.retrieveSessionEntry(StorageKey.CALENDAR_CONFIGURATION));
  }

  public retrieveTaskConfiguration() {
    return this.storeService.retrieveSessionEntry(StorageKey.TASK_CONFIGURATION);
  }

  public retrieveOptimizationParameters() {
    return this.storeService.retrieveSessionEntry(StorageKey.OPTIMISATION_PARAMETERS);
  }
}
  