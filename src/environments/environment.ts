// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientId: 'aa7e39c8-34c8-4779-8e58-a5a59f375757',
  authority: 'https://login.microsoftonline.com/55de13a7-a079-4518-a3c5-490e1d2f86ac',
  redirectUri: 'http://localhost:4200',
  apiUrl: 'http://localhost:7071/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
