import { LogLevel } from '@services/logger/log.level';

export const environment = {
  production: false,
  name: 'dev',
  logLevel: LogLevel.DEBUG,
  configurationPath: 'assets/config/config.dev.json',
  server: 'http://localhost:80',
  allowedurls: [],
  bootstrap: true,
  azuread: {
    issuer: 'https://login.microsoftonline.com/3b0e7247-e0d5-44bf-8ed1-d01b18d16ca2/v2.0',
    redirectUri: window.location.origin,
    clientId: 'e90786c4-31d9-465b-abe5-f831ec7cf2f0',
    responseType: 'code',
    strictDiscoveryDocumentValidation: false,
    scope: 'openid profile email api://e90786c4-31d9-465b-abe5-f831ec7cf2f0/app',
    showDebugInformation: false,
  
  }
};
