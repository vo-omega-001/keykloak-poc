import _ from "lodash";
import { ObjectUtils, StringUtils } from "@common/helpers";
import { IConfiguration, IRoute } from "./configuration.model";


export class ConfigurationHelper {

  private constructor() {}

  public static getRoute(configuration: IConfiguration, viewId: String) : IRoute {
    if (!ObjectUtils.isUndefinedOrNull(configuration) &&
      !ObjectUtils.isUndefinedOrNull(configuration.views) &&
      !ObjectUtils.isUndefinedOrNull(configuration.views.routes) &&
      !StringUtils.isUndefinedOrEmpty(viewId)) {
      const route: IRoute | undefined = _.find(configuration.views.routes, (route: IRoute) => {
        return (!StringUtils.isUndefinedOrEmpty(route.viewId))
        ? viewId === route.viewId : false;
      });
      if(!ObjectUtils.isUndefinedOrNull(route)) {
        return <IRoute>route;
      }
    }
    return {} as IRoute;
  }
}
