const uuid = require('uuid')
const { ipcRenderer } = require('electron')
const logger = require('../logger')

function sendRequest(request, args) {
  const requestId = uuid()
  const start = Date.now()

  return new Promise((resolve, reject) => {
    ipcRenderer.once(`/request/${requestId}`, (event, arg) => {
      logger.debug(`Request ${requestId} done in ${Date.now() - start}ms`)
      resolve(arg)
    })

    ipcRenderer.send('/request', { request, requestId, args })
  })
}

module.exports = sendRequest
