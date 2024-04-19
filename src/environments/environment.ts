// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: "(DEV)",
  //apiBaseUrl: "http://52.66.211.133:3000/api/v1" //"http:52.66.211.133:3000/api/v1"
  //apiBaseUrl: "http://localhost:5000/api/v1"
  apiBaseUrl: "http://localhost:8081"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
