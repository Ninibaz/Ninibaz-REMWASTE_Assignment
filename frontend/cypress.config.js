const { defineConfig } = require('cypress');
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    env: {
      apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    },
    setupNodeEvents(on, config) {
      // Implement image snapshot plugin
      addMatchImageSnapshotPlugin(on, config);
    },
  },
});