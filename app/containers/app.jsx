const React = require('react')
const FileSelector = require('../components/file-selector')

class App extends React.Component {
  render () {
    return (
      <div className='uk-container'>
        <h1>Photon</h1>
        <FileSelector src={process.env.PWD} />
      </div>
    )
  }
}

module.exports = App
