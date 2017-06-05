const fs = require('fs')
const logger = require('../logger')
const path = require('path')

function isPhoto(file) {
  return /\.(jpe?g|png|raw|cr2|tiff?|dng|x3f|crw)$/i.test(file)
}

function listPhotosInDirectory (directory, deep = true) {
  return new Promise((resolve, reject) => {
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
            } else if (stats.isDirectory() && deep){
              promises.push(listPhotosInDirectory(fullpath, deep))
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
  })
}

module.exports = {
  listPhotosInDirectory
}
