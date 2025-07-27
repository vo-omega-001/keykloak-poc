import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@environments/environment";

import { HttpClientService } from "@services/api";
import { LoggerService } from "@services/logger";
import { StringUtils } from "@helpers/common";
import { IConfiguration } from ".";
import { IResourceStatusListDto } from "@core/data";
/**
 * Load from the back the application configuration.
 * The URL of the configuration file is read from the environment.ts
 */

@Injectable()
export class ConfigurationService extends HttpClientService<IConfiguration, IResourceStatusListDto> {

  private configuration: IConfiguration | undefined;
  private readonly configurationPath: String;

  constructor(
    private readonly logger: LoggerService,
    private readonly http: HttpClient) {
    super();
    this.configurationPath = environment.configurationPath;
  }

  public getClazzName(): String {
    return "IConfiguration";
  }

  getHost(): String {
    return StringUtils.EMPTY_STRING;
  }

  public getHttpClient(): HttpClient {
    return this.http;
  }

  public getLogger(): LoggerService {
    return this.logger;
  }

  getRequestPath(): String {
    return this.configurationPath;
  }

  public getConfiguration(): IConfiguration {
    return (undefined === this.configuration)
      ? <IConfiguration>{} : this.configuration;
  }

  public load() : Promise<void> {
    console.info(`Load configuration from ${this.configurationPath}`);
    return new Promise<void>((resolve, reject) => {
      this.get().subscribe({
        next: (config) => {
          this.configuration = config;
          resolve();
        },
        error: (error) => {
          console.error("Error while loading configuration from the back", error);
          reject(error);
        }
      });
    });
  }
}
