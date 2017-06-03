const { ipcRenderer } = require('electron')
const LOGGER_LEVEL = ['error', 'warn', 'info', 'verbose', 'debug', 'silly']

const logger = {}

LOGGER_LEVEL.forEach(level => {
  logger[level] = (...args) => {
    ipcRenderer.send(`/logger/${level}`, ...args)
  }
})

module.exports = logger
