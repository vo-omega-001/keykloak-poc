import { LogLevel } from "@services/logger/log.level";

export const environment = {
  production: true,
  name: 'production',
  logLevel: window["env"]["logLevel"] || LogLevel.INFORMATION,
  configurationPath: "assets/config/config.deploy.json",
  server:  window["env"]["server"] || "@@@@ environment server field NOT INITIALIZED @@@@",
  allowedurls: [],
  bootstrap: true,
  azuread: {
   issuer: window["env"]["azuread.issuer"] || "@@@@ environment azuread.issuer field NOT INITIALIZED @@@@",
   redirectUri: window.location.origin,
   clientId: window["env"]["azuread.clientId"] || "@@@@ environment azuread.clientId field NOT INITIALIZED @@@@",
   responseType: 'code',
   strictDiscoveryDocumentValidation: window["env"]["azuread.strictDiscoveryDocumentValidation"] || false,
   scope: window["env"]["azuread.scope"] || "@@@@ environment azuread.scope field NOT INITIALIZED @@@@",
   showDebugInformation: window["env"]["azuread.showDebugInformation"] || false,
  }
};
