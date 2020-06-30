// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)


module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, args) => {

    if (browser.name === 'chrome') {
      
      // `args` is an araay of all the arguments
      // that will be passed to Chrome when it launchers
      args.push('--lang=zh')

      // whatever you return here becomes the new args
      return args
    }

    if (browser.name === 'electron') {
      // `args` is a `BrowserWindow` options object
      // https://electronjs.org/docs/api/browser-window#new-browserwindowoptions
      args['fullscreen'] = false;
      // whatever you return here becomes the new args
      return args
    }
  })
}