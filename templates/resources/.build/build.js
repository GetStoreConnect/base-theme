#!/usr/bin/env node

const esbuild = require('esbuild');
const { buildTypes, cleanUp } = require('./helpers');

(async () => {
  for (const buildType of buildTypes) {
    await esbuild.build(require(`./${buildType}-config.js`));
  }

  cleanUp();
})();
