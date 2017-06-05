const React = require('react')
const fs = require('fs')
const logger = require('../logger')
const request = require('../helpers/ipc-request')

class FileSelector extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pwd: props.src,
      allowDirectory: props,
      loading: false,
      files: []
    }

    this.openSelector = this.openSelector.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.setAllowsDirectory()
  }

  handleChange () {
    this.setState({
      loading: true
    })

    request('LOAD_FILES', { path: this.refs.selector.files[0].path })
      .then(files => {
        this.setState({loading: false})
        console.log(files)
      })
  }

  componentDidUpdate () {
    this.setAllowsDirectory()
  }

  setAllowsDirectory () {
    if (this.refs.selector) {
      this.refs.selector.directory = true
      this.refs.selector.webkitdirectory = true
    }
  }

  openSelector () {
    this.refs.selector.click()
  }

  render () {
    let fileItems = []
    let input

    this.state.files.forEach(file => {
      fileItems.push(<li key={file}><button>{file}</button></li>)
    })

    if (this.props.multiple) {
      input = <input ref='selector' type='file' multiple onChange={this.handleChange} />
    } else {
      input = <input ref='selector' type='file' onChange={this.handleChange} />
    }

    return (
      <div className='file-selector'>
        { input }
        <a className='uk-icon-button' data-uk-icon='icon: folder' onClick={this.openSelector}></a>
      </div>
    )
  }
}

module.exports = FileSelector
