const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
