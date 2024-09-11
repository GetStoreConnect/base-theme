#!/usr/bin/env node

const esbuild = require('esbuild');
const { buildTypes } = require('./helpers');

(async () => {
    for (const buildType of buildTypes) {
      const ctx = await esbuild.context(require(`./${buildType}-config.js`));
      ctx.watch();
    }
})();
