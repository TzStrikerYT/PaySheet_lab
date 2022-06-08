// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:5000/api/',
  //DISCOUNTS FOR SALARY
  EPS: 65000, // THE COMPANY PAY SOME PERCENT AND THE EMPLOYE PAY OTHER PERCENT
  COMPENSATION_BOX: 65000, // THE COMPANY PAY SOME PERCENT AND THE EMPLOYE PAY OTHER PERCENT
  ARL_TYPE1: 4000,
  ARL_TYPE2: 5000,
  ARL_TYPE3: 6000,
  ARL_TYPE4: 7000,
  ARL_TYPE5: 8000,

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
