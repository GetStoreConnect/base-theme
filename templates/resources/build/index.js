#!/usr/bin/env node
const esbuild = require('esbuild')

const configs = [
  require('./scripts-config.js'),
  require('./styles-config.js'),
  require('./files-config.js'),
]

;(async () => {
  for (let config of configs) {
    if (process.argv.includes('--watch')) {
      const context = await esbuild.context(config)
      context.watch()
    } else {
      await esbuild.build(config)
    }
  }
})()
