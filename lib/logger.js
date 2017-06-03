const { ipcMain } = require('electron')
const winston = require('winston')

const LOGGER_LEVEL = ['error', 'warn', 'info', 'verbose', 'debug', 'silly']

//
// TODO : Configure Winston
//
winston.level = 'debug'

LOGGER_LEVEL.forEach(level => {
  ipcMain.on(`/logger/${level}`, (event, ...args) => {
    winston.log(level, ...args)
  })
})

module.exports = winston
