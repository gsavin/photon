const _ = require('lodash')
const { ipcMain } = require('electron')
const logger = require('./logger')

const requestHandlers = {}

_.merge(requestHandlers,
  require('./controllers/files')
)

console.log(requestHandlers)
ipcMain.on('/request', async (event, arg) => {
  const returnToSender = (data) => {
    if (arg.requestId) {
      event.sender.send(`/request/${arg.requestId}`, data)
    }
  }

  if (!arg.requestId) {
    logger.warn(`Receive a request '${arg.request}' without requestId`)
  }

  if (!arg.request) {
    logger.error('Request name is missing')
    returnToSender({error: 'request name is missing'})

    return
  }

  logger.debug(`Handling ${arg.request} request (${arg.requestId})`)

  if (arg.request in requestHandlers) {
    try {
      let result = await requestHandlers[arg.request](arg.args)
      returnToSender(result)
    } catch (err) {
      logger.error(`Request failed : ${err}`)
      returnToSender({error: err})
    }
  } else {
    logger.warn(`Unknown request name ${arg.request}`)
    returnToSender({error: 'Unknown request name'})
  }
})
