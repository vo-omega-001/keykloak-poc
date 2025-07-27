import { Injectable, Inject, Type } from "@angular/core";
import { Route, Router, Routes } from "@angular/router";
import _ from "lodash";

import {
  IConfiguration, ConfigurationService,
  IRoute, IViewsConfig,
  VIEWS_CONFIG_TOKEN, ViewsConfigHelper, LoggerService,
} from "@app/core/services";
import {ObjectUtils, StringUtils} from "@helpers/common";




@Injectable({
  providedIn: 'root',
})
export class RouteLoaderService {
  constructor(
    private readonly logger: LoggerService,
    private readonly configurationService: ConfigurationService,
    private readonly router: Router,
    @Inject(VIEWS_CONFIG_TOKEN) private readonly viewsConfig: IViewsConfig) {}

  public load() {
    const configuration: IConfiguration = this.configurationService.getConfiguration();
    const routes: Routes = [
      { path: '', redirectTo: `${configuration.views.defaultRoute.path}`, pathMatch: 'full' },
    ];
    _.forEach(configuration.views.routes, (route: IRoute) => {
      const appRoute: Route = {
        path: `${route.path}`,
        component: ViewsConfigHelper.getComponent(this.viewsConfig, route),
        data:{
          viewId: route.viewId,
          view: ViewsConfigHelper.getView(this.viewsConfig, route),
          layout: ViewsConfigHelper.getLayout(this.viewsConfig, route)
        }
      };
      if (!ObjectUtils.isUndefinedOrNull(appRoute.component) &&
        !StringUtils.isUndefinedOrEmpty(appRoute.path)) {
        routes.push(appRoute);
      }
    });
    routes.push( ...this.router.config);
    this.router.resetConfig(routes);
  }
}
