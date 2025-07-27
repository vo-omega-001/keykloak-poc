import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ConfigurationService } from "@services/.";
import { LoggerService } from "@common/logger";
import { HttpClientService } from "@common/api";
import { StringUtils } from "@common/helpers";
import { IElementStatusList } from '@common/api';
import { IResource } from '../model/resource'

@Injectable()
export class ModelRequestService extends HttpClientService<IResource, IElementStatusList> {

  constructor(private readonly logger: LoggerService,
              private readonly config: ConfigurationService) {
    super();
  }

  getClazzName(): String {
    return "IModelDto";
  }

  getHost(): String {
    return this.config.getConfiguration().env.baseUrl;
  }

  getHttpClient(): HttpClient {
    return this.config.getHttpClient();
  }

  getLogger(): LoggerService {
    return this.config.getLogger();
  }

  getRequestPath(): String {
    return this.config.getConfiguration().api.model.path;
  }

  public getResource(id: String): Observable<IResource>  {
    const subPath: String =
      StringUtils.replace(
        this.config.getConfiguration().api.model.getModelById,
        ParameterPatterns.ID, id);
    return this.get(subPath);
  }

  public getResources(): Observable<Array<IResource>>  {
    return this.getAll(this.config.getConfiguration().api.model.getAllModels);
  }

  public createResource(resource: IResource): Observable<IResource> {
    return this.create(this.config.getConfiguration().api.planner.taskRequest.createTaskRequest, taskRequestDto);
  }

  public updateResource(id: String, resource: IResource): Observable<IResource> {
    const subPath: String =
      StringUtils.replace(
        this.config.getConfiguration().api.planner.taskRequest.updateTaskRequestById,
        ParameterPatterns.ID, id);
    return this.get(subPath);
  }
}
