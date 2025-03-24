import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import * as _ from "lodash";

import { LoggerService } from "@common/logger/.";
import { ObjectUtils, StringUtils } from "@common/helpers";
import { ApplicationErrorCode, ApplicationError } from "@common/error/.";


const httpOptions: object = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  observe: 'body',
  responseType: 'json',
  withCredentials: true
};

enum HttpVerbRequest {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
};


export abstract class HttpClientService<T, S> {

  abstract getClazzName() : String;
  abstract getHost(): String;
  abstract getHttpClient(): HttpClient;
  abstract getLogger(): LoggerService;
  abstract getRequestPath(): String;

  protected buildUrl(subPath?: String, requestParameters?: Object): String {
    const params: any = ObjectUtils.isUndefinedOrNull(requestParameters)
      ? {}: requestParameters;
    let url: String = (StringUtils.isUndefinedOrEmpty(this.getHost()))
      ? "." : this.getHost();
    url = (StringUtils.isUndefinedOrEmpty(this.getRequestPath()))
      ? url : `${url}/${this.getRequestPath()}`;
    url = ObjectUtils.isUndefinedOrNull(subPath)
      ? url : `${url}/${subPath}`;
    return `${url}${this.buildRequestParameters(url, params)}`;
  }

  protected buildRequestParameters(url:String, requestParameters: Object) : String {
    let params: String = "";
    if (!ObjectUtils.isUndefinedOrNull(requestParameters)) {
      _.map(Object.entries(requestParameters), (key: Array<String|number>, value: Array<String|number>) => {
        if (!StringUtils.isContains(url, String(key[0]))) {
          params += `&${key}=${value}`;
        }
      });
      if (!StringUtils.isContains(url, "?")) {
        params.replace(/^\&/, "?");
      }
    }
    return params;
  }

  protected request<U>(verb: HttpVerbRequest, url: String, httpOptions?: Object, body?: any) : Observable<U> {
    if (!ObjectUtils.isUndefinedOrNull(verb) && !StringUtils.isUndefinedOrEmpty(url)) {
      this.getLogger().info(`###############> ${verb} ${this.getClazzName()}: ${url}`);
      if (!ObjectUtils.isUndefinedOrNull(httpOptions)) {
        this.getLogger().debug(`###############> request options: ${JSON.stringify(httpOptions)}`);
      }
      if (!ObjectUtils.isUndefinedOrNull(body)) {
        this.getLogger().debug(`###############> request body: ${JSON.stringify(body)}`);
      }
      switch (verb) {
        case HttpVerbRequest.GET: {
           return this.getHttpClient().get<U>(`${url}`, httpOptions);
        }
        case HttpVerbRequest.POST:
        {
          return this.getHttpClient().post<U>(`${url}`, body, httpOptions);
        }
        case HttpVerbRequest.PUT:
        {
          return this.getHttpClient().put<U>(`${url}`, body, httpOptions);
        }
        case HttpVerbRequest.DELETE:
        {
          return this.getHttpClient().delete<U>(`${url}`, httpOptions);
        }
        default:
          //Do nothing
      }
    }
    throw new ApplicationError(
      ApplicationErrorCode.INVALID_PARAMETER,
      "invalid input request parameter");
  }

  public get(subPath?: String,
             requestParameters?: Object) : Observable<T> {
    const url: String = this.buildUrl(subPath, requestParameters);
    return this.request<T>(HttpVerbRequest.GET, url, httpOptions);
  }

  public getAll(subPath?: String) : Observable<Array<T>> {
    const url: String = this.buildUrl(subPath);
    return this.request<Array<T>>(HttpVerbRequest.GET, url, httpOptions);
  }

  public create(subPath?: String,
                body?: T) : Observable<T> {
    const url: String = this.buildUrl(subPath);
    return this.request<T>(HttpVerbRequest.POST, url, httpOptions, body);
  }

  public update(subPath?: String,
                requestParameters?: Object,
                body?: T) : Observable<T> {
    const url: String = this.buildUrl(subPath, requestParameters);
    return this.request<T>(HttpVerbRequest.PUT, url, httpOptions, body);
  }

  public delete(subPath?: String,
                requestParameters?: Object) : Observable<T> {
    const url: String = this.buildUrl(subPath, requestParameters);
    return this.request<T>(HttpVerbRequest.DELETE, url, httpOptions);
  }

  public deleteByIds(subPath?: String,
                     requestParameters?: Object, ids?: Array<String>) : Observable<S> {
    const url: String = this.buildUrl(subPath, requestParameters);
    return this.request<S>(HttpVerbRequest.DELETE, url, httpOptions, ids);
  }

  public deleteAll(subPath?: String) : Observable<S> {
    const url: String = this.buildUrl(subPath);
    return this.request<S>(HttpVerbRequest.DELETE, url, httpOptions);
  }
}
