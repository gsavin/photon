const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const logger = require('../logger')

const DEFAULT_LOAD_FILES_OPTIONS = {
  path: null,
  deep: true
}

function isPhoto(file) {
  return /\.(jpe?g|png|raw|cr2|tiff?|dng|x3f|crw)$/i.test(file)
}

function loadFilesRecursive (directory, options) {
  return new Promise((resolve, reject) => {
    try {
      fs.readdir(directory, 'utf-8', async (error, files) => {
        if (error) {
          reject(error)
        } else {
          let promises = []
          let photos = []

          files.forEach(file => {
            try {
              let fullpath = path.join(directory, file)
              let stats = fs.lstatSync(fullpath)

              if (stats.isFile()) {
                if (isPhoto(fullpath)) {
                  photos.push(fullpath)
                }
              } else if (stats.isDirectory() && options.deep){
                promises.push(loadFilesRecursive(fullpath, options))
              }
            } catch (error) {
              logger.error(error)
            }
          })

          if (promises.length > 0) {
            photos = photos.concat(...(await Promise.all(promises)))
          }

          resolve(photos)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

function loadFiles (args) {
  const options = {}
  _.merge(options, DEFAULT_LOAD_FILES_OPTIONS, args)

  return loadFilesRecursive(options.path, options)
}

module.exports = {
  'LOAD_FILES': loadFiles
}
