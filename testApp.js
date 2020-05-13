const cypress = require('cypress')

cypress.run({
  reporter: 'junit',
  browser: 'chrome',
  headed: true,
  config: {
    baseUrl: 'http://localhost:3000',
    video: true,
  },
  noExit: true,
  spec: './cypress/integration/cep.spec.js'
})
  .then((results) => {
    console.log(results)
  })
  .catch((err) => {
    console.error(err)
  })