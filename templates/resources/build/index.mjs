#!/usr/bin/env node
import esbuild from 'esbuild'
import scriptsConfig from './scripts-config.mjs'
import stylesConfig from './styles-config.mjs'
import filesConfig from './files-config.mjs'

const configs = [scriptsConfig, stylesConfig, filesConfig]

for (let config of configs) {
  if (process.argv.includes('--watch')) {
    const context = await esbuild.context(config)
    context.watch()
  } else {
    await esbuild.build(config)
  }
}
