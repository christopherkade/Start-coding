// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCl878798PoiJREDcxc-LFQGfHC_51NWo0',
    authDomain: 'start-coding.firebaseapp.com',
    databaseURL: 'https://start-coding.firebaseio.com',
    projectId: 'start-coding',
    storageBucket: '',
    messagingSenderId: '948468266810'
  }
};
