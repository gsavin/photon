//
// Allow electron to load JSX files
//
require('node-jsx').install({ harmony: true, extension: '.jsx' })

window.$ = window.jquery = require('jquery')
window.UIkit = require('./static/js/uikit.js')
require('./static/js/uikit-icons.min.js')

const React = require('react')
const ReactDOM = require('react-dom')
const Router = require('./containers/router')
const logger = require('./logger')

logger.debug('Loading default theme...')

const styleLink = document.createElement('link')
styleLink.rel = 'stylesheet'
styleLink.href = '../themes/default/bundle.css'

document.getElementsByTagName('head')[0].appendChild(styleLink)

ReactDOM.render(
  React.createElement(Router),
  document.getElementById('photon-root')
)
