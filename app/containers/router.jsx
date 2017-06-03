const React = require('react')
const ReactRouterDOM = require('react-router-dom')
const BrowserRouter = ReactRouterDOM.BrowserRouter

const App = require('./app')

module.exports = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
