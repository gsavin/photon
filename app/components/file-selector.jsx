const React = require('react')
const fs = require('fs')
const logger = require('../logger')

class FileSelector extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pwd: props.src,
      allowDirectory: props,
      loading: false,
      files: []
    }
  }

  componentDidMount () {
    this.setAllowsDirectory()
  }

  handleChange () {
    if (this.state.loading) {
      return true
    }

    logger.debug(`Loading files from ${this.state.pwd}`)

    this.setState({
      loading: true
    })

    fs.readdir(this.state.pwd, (err, files) => {
      if (err) {
        logger.error(err)
      }

      this.setState({
        files
      })
    })
  }

  componentDidUpdate () {
    this.setAllowsDirectory()
  }

  setAllowsDirectory () {
    if (this.refs.inputDirectory) {
      this.refs.inputDirectory.directory = true
      this.refs.inputDirectory.webkitdirectory = true
    }
  }

  render () {
    let fileItems = []

    this.state.files.forEach(file => {
      fileItems.push(<li key={file}><button>{file}</button></li>)
    })

    return (
      <div className='file-selector'>
        <input ref='inputDirectory' type='file' onChange={this.handleChange} />
        <ul>{fileItems}</ul>
      </div>
    )
  }
}

module.exports = FileSelector
