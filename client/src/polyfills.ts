import 'es6-shim'
import 'reflect-metadata'
require('zone.js/dist/zone')

import 'ts-helpers'

if (process.env.ENV === 'build') {
  // Production

} else {
  // Development

  Error['stackTraceLimit'] = (limit = Infinity) => void

  require('zone.js/dist/long-stack-trace-zone')
}
